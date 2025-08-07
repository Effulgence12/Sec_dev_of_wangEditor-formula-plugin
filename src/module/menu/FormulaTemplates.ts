/**
 * @description 公式模板组件
 * @author enhanced
 */

import $, { Dom7Array } from '../../utils/dom'
import { FRACTION_SVG, SQRT_SVG, EXP_SVG, LIMIT_SVG, TRIG_SVG, DROPDOWN_SVG } from '../../constants/icon-svg'
import { IDomEditor } from '@wangeditor/editor'
import { FormulaElement } from '../custom-types'

export interface FormulaTemplate {
  name: string
  icon: string
  latex: string
  description: string
  submenu?: FormulaTemplate[] // 可选的子菜单
}

export const FORMULA_TEMPLATES: FormulaTemplate[] = [
  {
    name: 'fraction',
    icon: FRACTION_SVG,
    latex: '\\frac{a}{b}',
    description: '分数'
  },
  {
    name: 'sqrt',
    icon: SQRT_SVG,
    latex: '\\sqrt{x}',
    description: '开方'
  },
  {
    name: 'exp',
    icon: EXP_SVG,
    latex: 'e^{x}',
    description: '指数'
  },
  {
    name: 'limit',
    icon: LIMIT_SVG,
    latex: '\\lim_{x \\to \\infty}',
    description: '极限'
  },
  {
    name: 'trig',
    icon: TRIG_SVG,
    latex: '\\sin(x)',
    description: '三角函数',
    submenu: [
      { name: 'sin', icon: '', latex: '\\sin(x)', description: 'sin' },
      { name: 'cos', icon: '', latex: '\\cos(x)', description: 'cos' },
      { name: 'tan', icon: '', latex: '\\tan(x)', description: 'tan' },
      { name: 'cot', icon: '', latex: '\\cot(x)', description: 'cot' },
      { name: 'sec', icon: '', latex: '\\sec(x)', description: 'sec' },
      { name: 'csc', icon: '', latex: '\\csc(x)', description: 'csc' }
    ]
  }
]

export class FormulaTemplatePanel {
  private $panel: Dom7Array | null = null

  constructor() {}

  createPanel(): Dom7Array {
    if (this.$panel) {
      return this.$panel
    }

    const $panel = $('<div class="formula-template-panel"></div>')
    
    // 添加样式到页面head
    this.addStyles()
    
    // 添加标题
    const $title = $('<div class="template-title">常用公式模板</div>')
    $panel.append($title)

    // 创建模板按钮容器
    const $container = $('<div class="template-buttons"></div>')
    
    FORMULA_TEMPLATES.forEach(template => {
      if (template.submenu) {
        // 创建带下拉菜单的按钮组
        const $buttonGroup = $('<div class="template-button-group" data-template="' + template.name + '"></div>')
        
        // 主按钮
        const $mainButton = $(`
          <button class="template-button has-submenu" data-latex="${template.latex}" title="${template.description}">
            ${template.icon}
            <span class="template-name">${template.description}</span>
            <span class="dropdown-arrow">${DROPDOWN_SVG}</span>
          </button>
        `)
        
        // 下拉菜单
        const $submenu = $('<div class="template-submenu"></div>')
        template.submenu.forEach(subTemplate => {
          const $subButton = $(`
            <button class="template-sub-button" data-latex="${subTemplate.latex}" title="${subTemplate.description}">
              ${subTemplate.description}
            </button>
          `)
          $submenu.append($subButton)
        })
        
        $buttonGroup.append($mainButton)
        $buttonGroup.append($submenu)
        $container.append($buttonGroup)
      } else {
        // 普通按钮
        const $button = $(`
          <button class="template-button" data-latex="${template.latex}" title="${template.description}">
            ${template.icon}
            <span class="template-name">${template.description}</span>
          </button>
        `)
        $container.append($button)
      }
      console.log('创建模板按钮:', template.name, template.latex)
    })

    $panel.append($container)
    
    this.$panel = $panel
    return $panel
  }

  private addStyles() {
    // 检查是否已经添加了样式
    if (document.getElementById('formula-template-styles')) {
      return
    }

    const style = document.createElement('style')
    style.id = 'formula-template-styles'
    style.innerHTML = `
      .formula-template-panel {
        padding: 15px;
        border-bottom: 1px solid #e8e8e8;
        margin-bottom: 15px;
      }
      .template-title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;
        color: #333;
      }
      .template-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .template-button-group {
        position: relative;
        display: inline-block;
      }
      .template-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px 8px;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        background: #fff;
        cursor: pointer;
        transition: all 0.2s;
        min-width: 70px;
        min-height: 60px;
        margin: 2px;
        position: relative;
      }
      .template-button.has-submenu {
        padding-bottom: 6px;
      }
      .template-button:hover {
        border-color: #1890ff;
        background-color: #f0f8ff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .template-button svg {
        width: 20px;
        height: 20px;
        margin-bottom: 4px;
        fill: #666;
        display: block;
      }
      .template-button:hover svg {
        fill: #1890ff;
      }
      .template-name {
        font-size: 11px;
        color: #666;
        text-align: center;
        line-height: 1.2;
      }
      .template-button:hover .template-name {
        color: #1890ff;
      }
      .dropdown-arrow {
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 8px;
        height: 8px;
        opacity: 0.6;
      }
      .dropdown-arrow svg {
        width: 8px;
        height: 8px;
        margin: 0;
      }
      .template-submenu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 120px;
        background: white;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        padding: 4px 0;
      }
      .template-button-group:hover .template-submenu {
        display: block;
      }
      .template-sub-button {
        display: block;
        width: 100%;
        padding: 8px 12px;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
        font-size: 12px;
        color: #333;
        transition: background-color 0.2s;
      }
      .template-sub-button:hover {
        background-color: #f0f8ff;
        color: #1890ff;
      }
    `
    document.head.appendChild(style)
  }
}