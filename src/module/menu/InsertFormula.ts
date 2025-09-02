/**
 * @description insert formula menu
 * @author wangfupeng
 */

import { IModalMenu } from '@wangeditor/editor'
import {
  DomEditor,
  IDomEditor,
  SlateNode,
  SlateRange,
  t,
  genModalTextareaElems,
  genModalButtonElems,
} from '@wangeditor/editor'
import { SIGMA_SVG, CLEAR_SVG } from '../../constants/icon-svg'
import $, { Dom7Array, DOMElement } from '../../utils/dom'
import { genRandomStr } from '../../utils/util'
import { FormulaElement } from '../custom-types'
import { FormulaTemplatePanel, FormulaPreview } from './FormulaTemplates'

/**
 * 生成唯一的 DOM ID
 */
function genDomID(): string {
  return genRandomStr('w-e-insert-formula')
}

class InsertFormulaMenu implements IModalMenu {
  readonly title = t('formula.insert')
  readonly iconSvg = SIGMA_SVG
  readonly tag = 'button'
  readonly showModal = true // 点击 button 时显示 modal
  readonly modalWidth = 800 // 增加宽度以容纳模板按钮和预览区
  private $content: Dom7Array | null = null
  private readonly textareaId = genDomID()
  private readonly buttonId = genDomID()
  private templatePanel: FormulaTemplatePanel | null = null
  private previewPanel: FormulaPreview | null = null

  getValue(editor: IDomEditor): string | boolean {
    // 插入菜单，不需要 value
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    // 任何时候，都不用激活 menu
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    // 点击菜单时，弹出 modal 之前，不需要执行其他代码
    // 此处空着即可
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isExpanded(selection)) return true // 选区非折叠，禁用

    const selectedElems = DomEditor.getSelectedElems(editor)

    const hasVoidElem = selectedElems.some(elem => editor.isVoid(elem))
    if (hasVoidElem) return true // 选中了 void 元素，禁用

    const hasPreElem = selectedElems.some(elem => DomEditor.getNodeType(elem) === 'pre')
    if (hasPreElem) return true // 选中了 pre 原则，禁用

    return false
  }

  getModalPositionNode(editor: IDomEditor): SlateNode | null {
    return null // modal 依据选区定位
  }

  getModalContentElem(editor: IDomEditor): DOMElement {
    const { textareaId, buttonId } = this

    const [textareaContainerElem, textareaElem] = genModalTextareaElems(
      t('formula.formula'),
      textareaId,
      t('formula.placeholder')
    )
    const $textarea = $(textareaElem)
    const [buttonContainerElem] = genModalButtonElems(buttonId, t('formula.ok'))

    if (this.$content == null) {
      // 第一次渲染
      const $content = $('<div class="formula-modal-container"></div>')

      // 添加模态框样式
      this.addModalStyles()

      // 初始化模板面板和预览面板
      this.templatePanel = new FormulaTemplatePanel()
      this.previewPanel = new FormulaPreview()

      // 使用事件委托在容器上绑定事件，避免重复绑定问题
      $content.on('click', '.template-button, .template-sub-button', e => {
        e.preventDefault()
        console.log('模板按钮被点击了 - target:', e.target, 'currentTarget:', e.currentTarget)

        // 使用 e.target 获取实际被点击的元素
        let target = e.target as HTMLElement

        // 如果点击的是按钮内部的元素（如SVG或span），需要向上查找到按钮元素
        while (
          target &&
          !target.classList.contains('template-button') &&
          !target.classList.contains('template-sub-button')
        ) {
          target = target.parentElement as HTMLElement
        }

        console.log('找到的按钮元素:', target)

        if (target) {
          const latex = target.getAttribute('data-latex')
          console.log('获取到的LaTeX:', latex)

          if (latex) {
            // 特殊处理清空按钮
            if (latex === 'CLEAR_BUTTON') {
              console.log('清空按钮被点击，清空输入框')
              const $textarea = $content.find(`#${textareaId}`)
              $textarea.val('')
              $textarea.focus()

              // 手动触发原生input事件来更新预览
              const textareaElement = $textarea[0] as HTMLTextAreaElement
              if (textareaElement) {
                const inputEvent = new Event('input', { bubbles: true })
                textareaElement.dispatchEvent(inputEvent)
              }

              console.log('已清空输入框内容')
              return
            }

            console.log('调用onInsert回调函数')
            // 将模板插入到textarea中
            const currentValue = $content.find(`#${textareaId}`).val() as string
            const newValue = currentValue ? `${currentValue} ${latex}` : latex
            console.log('设置新值:', newValue)

            const $textarea = $content.find(`#${textareaId}`)
            $textarea.val(newValue)
            $textarea.focus()

            // 手动触发原生input事件来更新预览，确保只触发一次
            const textareaElement = $textarea[0] as HTMLTextAreaElement
            if (textareaElement) {
              const inputEvent = new Event('input', { bubbles: true })
              textareaElement.dispatchEvent(inputEvent)
            }

            console.log('已更新输入框内容')
          }
        }
      })

      // 绑定textarea输入事件，实现实时预览
      $content.on('input', `#${textareaId}`, e => {
        const target = e.target
        if (!target) return

        const value = $(target).val()?.toString() || ''
        console.log('LaTeX输入变化:', value)

        if (this.previewPanel) {
          this.previewPanel.renderPreview(value)
        }
      })

      // 绑定确认按钮事件（第一次渲染时绑定，不要重复绑定）
      $content.on('click', `#${buttonId}`, e => {
        e.preventDefault()
        const value = $content.find(`#${textareaId}`).val()?.toString().trim() || ''
        this.insertFormula(editor, value)
        editor.hidePanelOrModal() // 隐藏 modal
      })

      // 绑定清空按钮事件
      $content.on('click', '#clear-formula-btn', e => {
        e.preventDefault()
        console.log('清空按钮被点击，清空输入框')
        const $textarea = $content.find(`#${textareaId}`)
        $textarea.val('')
        $textarea.focus()

        // 手动触发原生input事件来更新预览
        const textareaElement = $textarea[0] as HTMLTextAreaElement
        if (textareaElement) {
          const inputEvent = new Event('input', { bubbles: true })
          textareaElement.dispatchEvent(inputEvent)
        }

        console.log('已清空输入框内容')
      })

      // 记录属性，重要
      this.$content = $content
    }

    const $content = this.$content
    $content.html('') // 先清空内容

    // 创建左右分栏结构
    const $mainContainer = $('<div class="formula-main-container"></div>')

    // 左侧面板：模板选择和输入区
    const $leftPanel = $('<div class="formula-left-panel"></div>')

    // 添加模板面板
    if (this.templatePanel) {
      const $templatePanel = this.templatePanel.createPanel()
      $leftPanel.append($templatePanel)
    }

    // 添加输入区域和按钮
    $leftPanel.append(textareaContainerElem)
    $leftPanel.append(buttonContainerElem)

    // 右侧面板：预览区
    const $rightPanel = $('<div class="formula-right-panel"></div>')
    if (this.previewPanel) {
      const $previewPanel = this.previewPanel.createPreview()
      $rightPanel.append($previewPanel)
    }

    // 在预览区下方添加清空按钮
    const $clearButtonContainer = $('<div class="clear-button-container"></div>')
    const $clearButton = $(`
      <button class="clear-button" id="clear-formula-btn" title="清空公式">
        ${CLEAR_SVG}
        <span class="clear-button-text">清空</span>
      </button>
    `)
    $clearButtonContainer.append($clearButton)
    $rightPanel.append($clearButtonContainer)

    // 组装布局
    $mainContainer.append($leftPanel)
    $mainContainer.append($rightPanel)
    $content.append($mainContainer)

    // 设置 input val
    $textarea.val('')

    // focus 一个 input（异步，此时 DOM 尚未渲染）
    setTimeout(() => {
      $textarea.focus()
    })

    return $content[0]
  }

  private addModalStyles(): void {
    // 检查是否已经添加了样式
    if (document.getElementById('formula-modal-styles')) {
      return
    }

    const style = document.createElement('style')
    style.id = 'formula-modal-styles'
    style.innerHTML = `
      .formula-modal-container {
        width: 100%;
        height: 100%;
      }
      .formula-main-container {
        display: flex;
        width: 100%;
        height: 100%;
        gap: 0;
      }
      .formula-left-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .formula-right-panel {
        width: 400px;
        flex-shrink: 0;
      }
      
      /* 调整模板面板在左侧面板中的样式 */
      .formula-left-panel .formula-template-panel {
        border-bottom: 1px solid #e8e8e8;
        margin-bottom: 0;
        max-width: none;
      }
      
      /* 调整输入区域样式 */
      .formula-left-panel .w-e-modal-textarea-container {
        margin-bottom: 15px;
        padding: 0 15px;
      }
      
      .formula-left-panel .w-e-modal-button-container {
        padding: 0 15px 15px 15px;
        text-align: right;
      }
    `
    document.head.appendChild(style)
  }

  private insertFormula(editor: IDomEditor, value: string) {
    if (!value) return

    // 还原选区
    editor.restoreSelection()

    if (this.isDisabled(editor)) return

    const formulaElem: FormulaElement = {
      type: 'formula',
      value,
      children: [{ text: '' }], // void node 需要有一个空 text
    }
    editor.insertNode(formulaElem)
  }
}

export default InsertFormulaMenu
