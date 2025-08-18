/**
 * @description 公式模板组件
 * @author enhanced
 */

import $, { Dom7Array } from '../../utils/dom'
import {
  FRACTION_SVG,
  SQRT_SVG,
  EXP_SVG,
  LIMIT_SVG,
  TRIG_SVG,
  DROPDOWN_SVG,
  INTEGRAL_SVG,
  MATRIX_SVG,
  BRACKETS_SVG,
  LARGE_OPERATOR_SVG,
  GREEK_SVG,
  RELATION_SVG,
  ARROW_SVG,
  OTHER_SVG,
  // 关系符号
  EQ_SVG,
  NEQ_SVG,
  LEQ_SVG,
  GEQ_SVG,
  LT_SVG,
  GT_SVG,
  APPROX_SVG,
  EQUIV_SVG,
  SIM_SVG,
  SIMEQ_SVG,
  CONG_SVG,
  PROPTO_SVG,
  SUBSET_SVG,
  SUPSET_SVG,
  SUBSETEQ_SVG,
  SUPSETEQ_SVG,
  IN_SVG,
  NOTIN_SVG,
  NI_SVG,
  // 运算符
  SUM_SVG,
  PROD_SVG,
  CUP_SVG,
  CAP_SVG,
  SETMINUS_SVG,
  PM_SVG,
  MP_SVG,
  TIMES_SVG,
  DIV_SVG,
  CDOT_SVG,
  AST_SVG,
  STAR_SVG,
  CIRC_SVG,
  BULLET_SVG,
  // 箭头符号
  RIGHTARROW_SVG,
  LEFTARROW_SVG,
  LEFTRIGHTARROW_SVG,
  RIGHTARROW_DOUBLE_SVG,
  LEFTARROW_DOUBLE_SVG,
  LEFTRIGHTARROW_DOUBLE_SVG,
  UPARROW_SVG,
  DOWNARROW_SVG,
  UPDOWNARROW_SVG,
  NEARROW_SVG,
  SEARROW_SVG,
  SWARROW_SVG,
  NWARROW_SVG,
  // 其他符号
  ROUND_BRACKET_SVG,
  SQUARE_BRACKET_SVG,
  CURLY_BRACKET_SVG,
  ANGLE_BRACKET_SVG,
  INFTY_SVG,
  PARTIAL_SVG,
  NABLA_SVG,
  HBAR_SVG,
  ELL_SVG,
  WP_SVG,
  RE_SVG,
  IM_SVG,
  ALEPH_SVG,
  FORALL_SVG,
  EXISTS_SVG,
  NEXISTS_SVG,
  EMPTYSET_SVG,
  VARNOTHING_SVG,
  // 希腊字母
  ALPHA_SVG,
  BETA_SVG,
  GAMMA_SVG,
  DELTA_SVG,
  EPSILON_SVG,
  ZETA_SVG,
  ETA_SVG,
  THETA_SVG,
  IOTA_SVG,
  KAPPA_SVG,
  LAMBDA_SVG,
  MU_SVG,
  NU_SVG,
  XI_SVG,
  PI_SVG,
  RHO_SVG,
  SIGMA_SMALL_SVG,
  TAU_SVG,
  PHI_SVG,
  CHI_SVG,
  PSI_SVG,
  OMEGA_SVG,
  GAMMA_CAPITAL_SVG,
  DELTA_CAPITAL_SVG,
  THETA_CAPITAL_SVG,
  LAMBDA_CAPITAL_SVG,
  XI_CAPITAL_SVG,
  PI_CAPITAL_SVG,
  SIGMA_CAPITAL_SVG,
  PHI_CAPITAL_SVG,
  PSI_CAPITAL_SVG,
  OMEGA_CAPITAL_SVG,
  // 函数
  LOG_SVG,
  LN_SVG,
  EXP_FUNC_SVG,
  SIN_SVG,
  COS_SVG,
  TAN_SVG,
  COT_SVG,
  SEC_SVG,
  CSC_SVG,
} from '../../constants/icon-svg'
import { IDomEditor } from '@wangeditor/editor'
import { FormulaElement } from '../custom-types'
import katex from 'katex'

export interface FormulaTemplate {
  name: string
  icon: string
  latex: string
  description: string
  submenu?: FormulaTemplate[] // 可选的子菜单
}

export interface FormulaCategory {
  id: string
  name: string
  icon: string
  templates: FormulaTemplate[]
}

export const FORMULA_CATEGORIES: FormulaCategory[] = [
  {
    id: 'common',
    name: '常用',
    icon: FRACTION_SVG,
    templates: [
      {
        name: 'fraction',
        icon: FRACTION_SVG,
        latex: '\\frac{a}{b}',
        description: '分数',
      },
      {
        name: 'sqrt',
        icon: SQRT_SVG,
        latex: '\\sqrt{x}',
        description: '开方',
      },
      {
        name: 'exp',
        icon: EXP_SVG,
        latex: 'e^{x}',
        description: '指数',
      },
      {
        name: 'limit',
        icon: LIMIT_SVG,
        latex: '\\lim_{x \\to \\infty}',
        description: '极限',
      },
      {
        name: 'integral',
        icon: INTEGRAL_SVG,
        latex: '\\int_{a}^{b} f(x) dx',
        description: '积分',
      },
      {
        name: 'matrix',
        icon: MATRIX_SVG,
        latex: '\\begin{pmatrix}\na & b \\\\\nc & d\n\\end{pmatrix}',
        description: '矩阵',
      },
    ],
  },
  {
    id: 'functions',
    name: '函数',
    icon: TRIG_SVG,
    templates: [
      {
        name: 'trig',
        icon: TRIG_SVG,
        latex: '\\sin(x)',
        description: '三角函数',
        submenu: [
          { name: 'sin', icon: SIN_SVG, latex: '\\sin(x)', description: 'sin' },
          { name: 'cos', icon: COS_SVG, latex: '\\cos(x)', description: 'cos' },
          { name: 'tan', icon: TAN_SVG, latex: '\\tan(x)', description: 'tan' },
          { name: 'cot', icon: COT_SVG, latex: '\\cot(x)', description: 'cot' },
          { name: 'sec', icon: SEC_SVG, latex: '\\sec(x)', description: 'sec' },
          { name: 'csc', icon: CSC_SVG, latex: '\\csc(x)', description: 'csc' },
        ],
      },
      { name: 'log', icon: LOG_SVG, latex: '\\log(x)', description: '对数' },
      { name: 'ln', icon: LN_SVG, latex: '\\ln(x)', description: '自然对数' },
      { name: 'exp_func', icon: EXP_FUNC_SVG, latex: '\\exp(x)', description: '指数函数' },
    ],
  },
  {
    id: 'greek',
    name: '希腊字母',
    icon: GREEK_SVG,
    templates: [
      { name: 'alpha', icon: ALPHA_SVG, latex: '\\alpha', description: 'α' },
      { name: 'beta', icon: BETA_SVG, latex: '\\beta', description: 'β' },
      { name: 'gamma', icon: GAMMA_SVG, latex: '\\gamma', description: 'γ' },
      { name: 'delta', icon: DELTA_SVG, latex: '\\delta', description: 'δ' },
      { name: 'epsilon', icon: EPSILON_SVG, latex: '\\epsilon', description: 'ε' },
      { name: 'zeta', icon: ZETA_SVG, latex: '\\zeta', description: 'ζ' },
      { name: 'eta', icon: ETA_SVG, latex: '\\eta', description: 'η' },
      { name: 'theta', icon: THETA_SVG, latex: '\\theta', description: 'θ' },
      { name: 'iota', icon: IOTA_SVG, latex: '\\iota', description: 'ι' },
      { name: 'kappa', icon: KAPPA_SVG, latex: '\\kappa', description: 'κ' },
      { name: 'lambda', icon: LAMBDA_SVG, latex: '\\lambda', description: 'λ' },
      { name: 'mu', icon: MU_SVG, latex: '\\mu', description: 'μ' },
      { name: 'nu', icon: NU_SVG, latex: '\\nu', description: 'ν' },
      { name: 'xi', icon: XI_SVG, latex: '\\xi', description: 'ξ' },
      { name: 'pi', icon: PI_SVG, latex: '\\pi', description: 'π' },
      { name: 'rho', icon: RHO_SVG, latex: '\\rho', description: 'ρ' },
      { name: 'sigma', icon: SIGMA_SMALL_SVG, latex: '\\sigma', description: 'σ' },
      { name: 'tau', icon: TAU_SVG, latex: '\\tau', description: 'τ' },
      { name: 'phi', icon: PHI_SVG, latex: '\\phi', description: 'φ' },
      { name: 'chi', icon: CHI_SVG, latex: '\\chi', description: 'χ' },
      { name: 'psi', icon: PSI_SVG, latex: '\\psi', description: 'ψ' },
      { name: 'omega', icon: OMEGA_SVG, latex: '\\omega', description: 'ω' },
      { name: 'Gamma', icon: GAMMA_CAPITAL_SVG, latex: '\\Gamma', description: 'Γ' },
      { name: 'Delta', icon: DELTA_CAPITAL_SVG, latex: '\\Delta', description: 'Δ' },
      { name: 'Theta', icon: THETA_CAPITAL_SVG, latex: '\\Theta', description: 'Θ' },
      { name: 'Lambda', icon: LAMBDA_CAPITAL_SVG, latex: '\\Lambda', description: 'Λ' },
      { name: 'Xi', icon: XI_CAPITAL_SVG, latex: '\\Xi', description: 'Ξ' },
      { name: 'Pi', icon: PI_CAPITAL_SVG, latex: '\\Pi', description: 'Π' },
      { name: 'Sigma', icon: SIGMA_CAPITAL_SVG, latex: '\\Sigma', description: 'Σ' },
      { name: 'Phi', icon: PHI_CAPITAL_SVG, latex: '\\Phi', description: 'Φ' },
      { name: 'Psi', icon: PSI_CAPITAL_SVG, latex: '\\Psi', description: 'Ψ' },
      { name: 'Omega', icon: OMEGA_CAPITAL_SVG, latex: '\\Omega', description: 'Ω' },
    ],
  },
  {
    id: 'relations',
    name: '关系符号',
    icon: RELATION_SVG,
    templates: [
      { name: 'eq', icon: EQ_SVG, latex: '=', description: '等于' },
      { name: 'neq', icon: NEQ_SVG, latex: '\\neq', description: '不等于' },
      { name: 'leq', icon: LEQ_SVG, latex: '\\leq', description: '小于等于' },
      { name: 'geq', icon: GEQ_SVG, latex: '\\geq', description: '大于等于' },
      { name: 'lt', icon: LT_SVG, latex: '<', description: '小于' },
      { name: 'gt', icon: GT_SVG, latex: '>', description: '大于' },
      { name: 'approx', icon: APPROX_SVG, latex: '\\approx', description: '约等于' },
      { name: 'equiv', icon: EQUIV_SVG, latex: '\\equiv', description: '恒等于' },
      { name: 'sim', icon: SIM_SVG, latex: '\\sim', description: '相似' },
      { name: 'simeq', icon: SIMEQ_SVG, latex: '\\simeq', description: '相似等于' },
      { name: 'cong', icon: CONG_SVG, latex: '\\cong', description: '全等' },
      { name: 'propto', icon: PROPTO_SVG, latex: '\\propto', description: '成比例' },
      { name: 'subset', icon: SUBSET_SVG, latex: '\\subset', description: '子集' },
      { name: 'supset', icon: SUPSET_SVG, latex: '\\supset', description: '超集' },
      { name: 'subseteq', icon: SUBSETEQ_SVG, latex: '\\subseteq', description: '子集或等于' },
      { name: 'supseteq', icon: SUPSETEQ_SVG, latex: '\\supseteq', description: '超集或等于' },
      { name: 'in', icon: IN_SVG, latex: '\\in', description: '属于' },
      { name: 'notin', icon: NOTIN_SVG, latex: '\\notin', description: '不属于' },
      { name: 'ni', icon: NI_SVG, latex: '\\ni', description: '包含' },
    ],
  },
  {
    id: 'operators',
    name: '运算符',
    icon: LARGE_OPERATOR_SVG,
    templates: [
      {
        name: 'large_operator',
        icon: LARGE_OPERATOR_SVG,
        latex: '\\sum',
        description: '大型运算符',
        submenu: [
          { name: 'sum', icon: SUM_SVG, latex: '\\sum_{i=1}^{n}', description: '求和' },
          { name: 'prod', icon: PROD_SVG, latex: '\\prod_{i=1}^{n}', description: '求积' },
          { name: 'cup', icon: CUP_SVG, latex: '\\cup', description: '并集' },
          { name: 'cap', icon: CAP_SVG, latex: '\\cap', description: '交集' },
          { name: 'setminus', icon: SETMINUS_SVG, latex: '\\setminus', description: '差集' },
        ],
      },
      { name: 'pm', icon: PM_SVG, latex: '\\pm', description: '正负' },
      { name: 'mp', icon: MP_SVG, latex: '\\mp', description: '负正' },
      { name: 'times', icon: TIMES_SVG, latex: '\\times', description: '乘号' },
      { name: 'div', icon: DIV_SVG, latex: '\\div', description: '除号' },
      { name: 'cdot', icon: CDOT_SVG, latex: '\\cdot', description: '点乘' },
      { name: 'ast', icon: AST_SVG, latex: '\\ast', description: '星号' },
      { name: 'star', icon: STAR_SVG, latex: '\\star', description: '五角星' },
      { name: 'circ', icon: CIRC_SVG, latex: '\\circ', description: '圆圈' },
      { name: 'bullet', icon: BULLET_SVG, latex: '\\bullet', description: '实心圆' },
    ],
  },
  {
    id: 'arrows',
    name: '箭头',
    icon: ARROW_SVG,
    templates: [
      { name: 'rightarrow', icon: RIGHTARROW_SVG, latex: '\\rightarrow', description: '右箭头' },
      { name: 'leftarrow', icon: LEFTARROW_SVG, latex: '\\leftarrow', description: '左箭头' },
      {
        name: 'leftrightarrow',
        icon: LEFTRIGHTARROW_SVG,
        latex: '\\leftrightarrow',
        description: '双向箭头',
      },
      {
        name: 'Rightarrow',
        icon: RIGHTARROW_DOUBLE_SVG,
        latex: '\\Rightarrow',
        description: '右双线箭头',
      },
      {
        name: 'Leftarrow',
        icon: LEFTARROW_DOUBLE_SVG,
        latex: '\\Leftarrow',
        description: '左双线箭头',
      },
      {
        name: 'Leftrightarrow',
        icon: LEFTRIGHTARROW_DOUBLE_SVG,
        latex: '\\Leftrightarrow',
        description: '双向双线箭头',
      },
      { name: 'uparrow', icon: UPARROW_SVG, latex: '\\uparrow', description: '上箭头' },
      { name: 'downarrow', icon: DOWNARROW_SVG, latex: '\\downarrow', description: '下箭头' },
      {
        name: 'updownarrow',
        icon: UPDOWNARROW_SVG,
        latex: '\\updownarrow',
        description: '上下箭头',
      },
      { name: 'nearrow', icon: NEARROW_SVG, latex: '\\nearrow', description: '右上箭头' },
      { name: 'searrow', icon: SEARROW_SVG, latex: '\\searrow', description: '右下箭头' },
      { name: 'swarrow', icon: SWARROW_SVG, latex: '\\swarrow', description: '左下箭头' },
      { name: 'nwarrow', icon: NWARROW_SVG, latex: '\\nwarrow', description: '左上箭头' },
    ],
  },
  {
    id: 'others',
    name: '其他符号',
    icon: OTHER_SVG,
    templates: [
      {
        name: 'brackets',
        icon: BRACKETS_SVG,
        latex: '()',
        description: '括号',
        submenu: [
          { name: 'round', icon: ROUND_BRACKET_SVG, latex: '(x)', description: '小括号' },
          { name: 'square', icon: SQUARE_BRACKET_SVG, latex: '[x]', description: '中括号' },
          { name: 'curly', icon: CURLY_BRACKET_SVG, latex: '\\{x\\}', description: '大括号' },
          {
            name: 'angle',
            icon: ANGLE_BRACKET_SVG,
            latex: '\\langle x \\rangle',
            description: '尖括号',
          },
        ],
      },
      { name: 'infty', icon: INFTY_SVG, latex: '\\infty', description: '无穷大' },
      { name: 'partial', icon: PARTIAL_SVG, latex: '\\partial', description: '偏导数' },
      { name: 'nabla', icon: NABLA_SVG, latex: '\\nabla', description: '梯度' },
      { name: 'hbar', icon: HBAR_SVG, latex: '\\hbar', description: '约化普朗克常数' },
      { name: 'ell', icon: ELL_SVG, latex: '\\ell', description: '花体l' },
      { name: 'wp', icon: WP_SVG, latex: '\\wp', description: '韦尔斯特拉斯p' },
      { name: 'Re', icon: RE_SVG, latex: '\\Re', description: '实部' },
      { name: 'Im', icon: IM_SVG, latex: '\\Im', description: '虚部' },
      { name: 'aleph', icon: ALEPH_SVG, latex: '\\aleph', description: '阿列夫' },
      { name: 'forall', icon: FORALL_SVG, latex: '\\forall', description: '全称量词' },
      { name: 'exists', icon: EXISTS_SVG, latex: '\\exists', description: '存在量词' },
      { name: 'nexists', icon: NEXISTS_SVG, latex: '\\nexists', description: '不存在' },
      { name: 'emptyset', icon: EMPTYSET_SVG, latex: '\\emptyset', description: '空集' },
      { name: 'varnothing', icon: VARNOTHING_SVG, latex: '\\varnothing', description: '空集变体' },
    ],
  },
]

export class FormulaTemplatePanel {
  private $panel: Dom7Array | null = null
  private currentCategory: string = 'common'

  constructor() {}

  createPanel(): Dom7Array {
    if (this.$panel) {
      return this.$panel
    }

    const $panel = $('<div class="formula-template-panel"></div>')

    // 添加样式到页面head
    this.addStyles()

    // 添加标题
    const $title = $('<div class="template-title">公式模板</div>')
    $panel.append($title)

    // 创建标签页容器
    const $tabsContainer = $('<div class="template-tabs"></div>')
    const $tabsNav = $('<div class="template-tabs-nav"></div>')
    const $tabsContent = $('<div class="template-tabs-content"></div>')

    // 创建标签导航
    FORMULA_CATEGORIES.forEach((category, index) => {
      const isFirst = index === 0
      const $tab = $(`
        <button class="template-tab ${isFirst ? 'active' : ''}" data-category="${category.id}">
          ${category.icon}
          <span class="tab-name">${category.name}</span>
        </button>
      `)

      // 直接为每个标签绑定点击事件
      $tab.on('click', e => {
        e.preventDefault()
        e.stopPropagation()

        console.log('标签被点击:', category.id, '当前分类:', this.currentCategory)

        if (category.id !== this.currentCategory) {
          this.switchTab(category.id, $panel)
        }
      })

      $tabsNav.append($tab)

      // 设置初始的当前分类
      if (isFirst) {
        this.currentCategory = category.id
      }
    })

    // 创建标签内容面板
    FORMULA_CATEGORIES.forEach((category, index) => {
      const isFirst = index === 0
      const $tabPane = $(`
        <div class="template-tab-pane ${isFirst ? 'active' : ''}" data-category="${category.id}">
          <div class="template-buttons"></div>
        </div>
      `)

      const $buttonsContainer = $tabPane.find('.template-buttons')

      // 为每个分类创建按钮
      category.templates.forEach(template => {
        if (template.submenu) {
          // 创建带下拉菜单的按钮组
          const $buttonGroup = $(
            '<div class="template-button-group" data-template="' + template.name + '"></div>'
          )

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
          $buttonsContainer.append($buttonGroup)
        } else {
          // 普通按钮
          const $button = $(`
          <button class="template-button" data-latex="${template.latex}" title="${template.description}">
            ${template.icon}
            <span class="template-name">${template.description}</span>
          </button>
        `)
          $buttonsContainer.append($button)
        }
      })

      $tabsContent.append($tabPane)
    })

    $tabsContainer.append($tabsNav)
    $tabsContainer.append($tabsContent)
    $panel.append($tabsContainer)

    this.$panel = $panel
    return $panel
  }

  private switchTab(categoryId: string, $panel: Dom7Array): void {
    console.log('切换标签到:', categoryId)

    this.currentCategory = categoryId

    // 切换标签激活状态
    const $allTabs = $panel.find('.template-tab')
    const $targetTab = $panel.find(`.template-tab[data-category="${categoryId}"]`)

    console.log('找到的标签数量:', $allTabs.length, '目标标签:', $targetTab.length)

    $allTabs.removeClass('active')
    $targetTab.addClass('active')

    // 切换内容面板
    const $allPanes = $panel.find('.template-tab-pane')
    const $targetPane = $panel.find(`.template-tab-pane[data-category="${categoryId}"]`)

    console.log('找到的面板数量:', $allPanes.length, '目标面板:', $targetPane.length)

    $allPanes.removeClass('active')
    $targetPane.addClass('active')

    console.log('标签切换完成')
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
        max-width: 600px;
      }
      .template-title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 15px;
        color: #333;
        text-align: center;
      }

      /* 标签页导航样式 */
      .template-tabs {
        width: 100%;
      }
      .template-tabs-nav {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #e8e8e8;
        margin-bottom: 15px;
        gap: 2px;
      }
      .template-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px 15px;
        border: none;
        background: #f8f9fa;
        cursor: pointer;
        transition: all 0.2s;
        border-radius: 6px 6px 0 0;
        min-width: 70px;
        font-size: 12px;
        color: #666;
        position: relative;
      }
      .template-tab.active {
        background: #fff;
        color: #1890ff;
        border-bottom: 2px solid #1890ff;
        font-weight: 500;
      }
      .template-tab:hover:not(.active) {
        background: #e9ecef;
        color: #495057;
      }
      .template-tab .math-symbol {
        font-size: 18px;
        margin-bottom: 3px;
        color: inherit;
        font-family: 'Times New Roman', 'KaTeX_Main', serif;
      }
      .template-tab svg {
        width: 16px;
        height: 16px;
        margin-bottom: 2px;
        fill: currentColor;
      }
      .tab-name {
        font-size: 11px;
        line-height: 1.2;
        font-weight: 500;
      }

      /* 标签页内容样式 */
      .template-tabs-content {
        min-height: 200px;
        max-height: 300px;
        overflow-y: auto;
      }
      .template-tab-pane {
        display: none !important;
      }
      .template-tab-pane.active {
        display: block !important;
      }

      /* 模板按钮样式 */
      .template-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 8px;
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
        padding: 12px 10px;
        border: 1px solid #d9d9d9;
        border-radius: 8px;
        background: #fff;
        cursor: pointer;
        transition: all 0.2s;
        min-width: 80px;
        min-height: 70px;
        margin: 3px;
        position: relative;
      }
      .template-button.has-submenu {
        padding-bottom: 8px;
      }
      .template-button:hover {
        border-color: #1890ff;
        background-color: #f0f8ff;
        box-shadow: 0 3px 6px rgba(0,0,0,0.12);
        transform: translateY(-1px);
      }
      
      /* 数学符号样式 */
      .math-symbol {
        font-size: 24px;
        font-weight: 500;
        color: #333;
        font-family: 'Times New Roman', 'KaTeX_Main', serif;
        line-height: 1;
        margin-bottom: 6px;
        display: block;
      }
      .template-button:hover .math-symbol {
        color: #1890ff;
      }
      
      /* 兼容旧的SVG图标 */
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        font-weight: 500;
      }
      .template-button:hover .template-name {
        color: #1890ff;
      }
      .dropdown-arrow {
        position: absolute;
        bottom: 1px;
        right: 1px;
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
        padding: 6px 12px;
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

      /* 滚动条样式 */
      .template-tabs-content::-webkit-scrollbar {
        width: 6px;
      }
      .template-tabs-content::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
      }
      .template-tabs-content::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
      }
      .template-tabs-content::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }
    `
    document.head.appendChild(style)
  }
}

export class FormulaPreview {
  private $container: Dom7Array | null = null
  private $previewArea: Dom7Array | null = null
  private $errorArea: Dom7Array | null = null

  constructor() {}

  createPreview(): Dom7Array {
    if (this.$container) {
      return this.$container
    }

    const $container = $('<div class="formula-preview-container"></div>')

    // 添加预览样式
    this.addPreviewStyles()

    // 预览标题
    const $title = $('<div class="preview-title">实时预览</div>')
    $container.append($title)

    // 预览区域
    const $previewArea = $('<div class="preview-area"></div>')
    const $placeholder = $(
      '<div class="preview-placeholder">在左侧输入LaTeX公式，这里将显示预览效果</div>'
    )
    $previewArea.append($placeholder)
    $container.append($previewArea)

    // 错误提示区域
    const $errorArea = $('<div class="preview-error" style="display: none;"></div>')
    $container.append($errorArea)

    this.$container = $container
    this.$previewArea = $previewArea
    this.$errorArea = $errorArea

    return $container
  }

  renderPreview(latexString: string): void {
    console.log('renderPreview 被调用，参数:', latexString)

    if (!this.$previewArea || !this.$errorArea) {
      console.error('预览区域未初始化')
      return
    }

    // 清空之前的内容和隐藏错误区域
    this.$previewArea.html('')
    if (this.$errorArea[0]) {
      ;(this.$errorArea[0] as HTMLElement).style.display = 'none'
    }

    if (!latexString.trim()) {
      // 空字符串，显示占位符
      const placeholderHtml =
        '<div class="preview-placeholder">在左侧输入LaTeX公式，这里将显示预览效果</div>'
      this.$previewArea.html(placeholderHtml)
      return
    }

    try {
      // 尝试渲染LaTeX - 使用与原插件完全相同的方法
      const previewElement = document.createElement('span')
      previewElement.style.display = 'inline-block'

      katex.render(latexString, previewElement, {
        throwOnError: false, // 与原插件保持一致
      })

      // 直接将DOM元素添加到预览区，而不是使用outerHTML
      this.$previewArea[0].appendChild(previewElement)
      console.log('LaTeX 渲染成功')
    } catch (error) {
      // LaTeX语法错误，显示错误信息
      console.log('LaTeX 渲染失败:', error)
      const errorMessage = error instanceof Error ? error.message : '未知错误'

      // 显示错误信息
      this.$errorArea.text(`语法错误: ${errorMessage}`)

      // 显示错误区域
      if (this.$errorArea[0]) {
        ;(this.$errorArea[0] as HTMLElement).style.display = 'block'
      }

      // 在预览区显示原始LaTeX代码
      const rawLatexHtml = `<div class="preview-raw-latex">${latexString}</div>`
      this.$previewArea.html(rawLatexHtml)
    }
  }

  private addPreviewStyles(): void {
    // 检查是否已经添加了样式
    if (document.getElementById('formula-preview-styles')) {
      return
    }

    const style = document.createElement('style')
    style.id = 'formula-preview-styles'
    style.innerHTML = `
      .formula-preview-container {
        flex: 1;
        padding: 15px;
        border-left: 1px solid #e8e8e8;
        background: #fafafa;
        display: flex;
        flex-direction: column;
        min-height: 500px;
      }
      .preview-title {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 15px;
        color: #333;
        text-align: center;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 8px;
      }
      .preview-area {
        flex: 1;
        padding: 20px;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        margin-bottom: 10px;
        overflow: auto;
      }
      .preview-placeholder {
        color: #999;
        font-size: 18px;
        text-align: center;
        line-height: 1.5;
      }
      .katex-rendered {
        font-size: 25px;
        color: #333;
      }
      .preview-raw-latex {
        background: #f5f5f5;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ddd;
        font-family: 'Courier New', monospace;
        font-size: 25px;
        color: #666;
        max-width: 100%;
        word-break: break-all;
      }
      .preview-error {
        padding: 8px 12px;
        background: #fff2f0;
        border: 1px solid #ffccc7;
        border-radius: 4px;
        color: #ff4d4f;
        font-size: 12px;
        line-height: 1.4;
      }
      
      /* 关键修复：隐藏KaTeX的HTML部分（无格式字母），只显示MathML渲染部分（正常数学公式） */
      .preview-area .katex .katex-html {
        display: none !important;
      }
      
      /* 确保KaTeX MathML部分正常显示 */
      .preview-area .katex .katex-mathml {
        display: inline-block !important;
      }
      
      /* 控制预览区公式大小 - 这里是真正控制公式大小的地方 */
      
      /* 也可以通过控制span元素来设置大小 */
      .preview-area span {
        font-size: 40px !important;  /* 备用方案 */
      }
    `
    document.head.appendChild(style)
  }
}
