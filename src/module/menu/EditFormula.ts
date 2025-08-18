/**
 * @description edit formula menu
 * @author wangfupeng
 */

import { IModalMenu } from '@wangeditor/editor'
import {
  DomEditor,
  IDomEditor,
  SlateNode,
  SlateTransforms,
  SlateRange,
  t,
  genModalTextareaElems,
  genModalButtonElems,
} from '@wangeditor/editor'
import { PENCIL_SVG } from '../../constants/icon-svg'
import $, { Dom7Array, DOMElement } from '../../utils/dom'
import { genRandomStr } from '../../utils/util'
import { FormulaElement } from '../custom-types'
import { FormulaPreview } from './FormulaTemplates'

/**
 * 生成唯一的 DOM ID
 */
function genDomID(): string {
  return genRandomStr('w-e-insert-formula')
}

class EditFormulaMenu implements IModalMenu {
  readonly title = t('formula.edit')
  readonly iconSvg = PENCIL_SVG
  readonly tag = 'button'
  readonly showModal = true // 点击 button 时显示 modal
  readonly modalWidth = 700
  private $content: Dom7Array | null = null
  private readonly textareaId = genDomID()
  private readonly buttonId = genDomID()
  private previewPanel: FormulaPreview | null = null

  private getSelectedElem(editor: IDomEditor): FormulaElement | null {
    const node = DomEditor.getSelectedNodeByType(editor, 'formula')
    if (node == null) return null
    return node as FormulaElement
  }

  /**
   * 获取公式 value
   * @param editor editor
   */
  getValue(editor: IDomEditor): string | boolean {
    const formulaElem = this.getSelectedElem(editor)
    if (formulaElem) {
      return formulaElem.value || ''
    }
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    // 无需 active
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

    // 未匹配到 formula node 则禁用
    const formulaElem = this.getSelectedElem(editor)
    if (formulaElem == null) return true

    return false
  }

  // modal 定位
  getModalPositionNode(editor: IDomEditor): SlateNode | null {
    return this.getSelectedElem(editor)
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
      const $content = $('<div class="formula-edit-container"></div>')

      // 初始化预览面板
      this.previewPanel = new FormulaPreview()

      // 添加样式
      this.addEditModalStyles()

      // 绑定textarea输入事件，实现实时预览
      $content.on('input', `#${textareaId}`, e => {
        const target = e.target
        if (!target) return

        const value = $(target).val()?.toString() || ''
        if (this.previewPanel) {
          this.previewPanel.renderPreview(value)
        }
      })

      // 绑定事件（第一次渲染时绑定，不要重复绑定）
      $content.on('click', `#${buttonId}`, e => {
        e.preventDefault()
        const value = $content.find(`#${textareaId}`).val().trim()
        this.updateFormula(editor, value)
        editor.hidePanelOrModal() // 隐藏 modal
      })

      // 记录属性，重要
      this.$content = $content
    }

    const $content = this.$content
    $content.html('') // 先清空内容

    // 创建左右分栏结构
    const $mainContainer = $('<div class="formula-edit-main"></div>')

    // 左侧面板：输入区
    const $leftPanel = $('<div class="formula-edit-left"></div>')
    $leftPanel.append(textareaContainerElem)
    $leftPanel.append(buttonContainerElem)

    // 右侧面板：预览区
    const $rightPanel = $('<div class="formula-edit-right"></div>')
    if (this.previewPanel) {
      const $previewPanel = this.previewPanel.createPreview()
      $rightPanel.append($previewPanel)
    }

    // 组装布局
    $mainContainer.append($leftPanel)
    $mainContainer.append($rightPanel)
    $content.append($mainContainer)

    // 设置 input val 并触发预览
    const value = this.getValue(editor)
    $textarea.val(value)

    // 初始化预览
    if (this.previewPanel && value) {
      this.previewPanel.renderPreview(value.toString())
    }

    // focus 一个 input（异步，此时 DOM 尚未渲染）
    setTimeout(() => {
      $textarea.focus()
    })

    return $content[0]
  }

  private addEditModalStyles(): void {
    // 检查是否已经添加了样式
    if (document.getElementById('formula-edit-modal-styles')) {
      return
    }

    const style = document.createElement('style')
    style.id = 'formula-edit-modal-styles'
    style.innerHTML = `
      .formula-edit-container {
        width: 100%;
        height: 100%;
      }
      .formula-edit-main {
        display: flex;
        width: 100%;
        height: 100%;
        gap: 0;
      }
      .formula-edit-left {
        flex: 1;
        padding: 15px;
        display: flex;
        flex-direction: column;
      }
      .formula-edit-right {
        width: 300px;
        flex-shrink: 0;
      }
      
      /* 调整输入区域样式 */
      .formula-edit-left .w-e-modal-textarea-container {
        margin-bottom: 15px;
        flex: 1;
      }
      
      .formula-edit-left .w-e-modal-button-container {
        text-align: right;
      }
    `
    document.head.appendChild(style)
  }

  private updateFormula(editor: IDomEditor, value: string) {
    if (!value) return

    // 还原选区
    editor.restoreSelection()

    if (this.isDisabled(editor)) return

    const selectedElem = this.getSelectedElem(editor)
    if (selectedElem == null) return

    const path = DomEditor.findPath(editor, selectedElem)
    const props: Partial<FormulaElement> = { value }
    SlateTransforms.setNodes(editor, props, { at: path })
  }
}

export default EditFormulaMenu
