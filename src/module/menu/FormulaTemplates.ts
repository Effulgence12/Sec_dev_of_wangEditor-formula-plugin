/**
 * @description 公式模板组件
 * @author enhanced
 */

// 可编辑区域接口定义
interface EditableRegion {
  type:
    | 'variable'
    | 'number'
    | 'subscript'
    | 'superscript'
    | 'function_parameter'
    | 'fraction_numerator'
    | 'fraction_denominator'
    | 'sqrt_content'
    | 'integral_lower'
    | 'integral_upper'
  value: string
  startIndex: number
  endIndex: number
  key: string
  originalLatex?: string
  functionName?: string // 仅在 type 为 'function_parameter' 时存在
  fractionType?: 'numerator' | 'denominator' // 仅在 type 为 'fraction_numerator' 或 'fraction_denominator' 时存在
}

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
  // 上标符号
  SUPERSCRIPT_SVG,
  OVERLINE_SVG,
  PRIME_SVG,
  DOUBLE_PRIME_SVG,
  TRIPLE_PRIME_SVG,
  DOT_SVG,
  DOUBLE_DOT_SVG,
  TILDE_SVG,
  HAT_SVG,
  VEC_SVG,
  BAR_SVG,
  CHECK_SVG,
  BREVE_SVG,
  RING_SVG,
  // 清空按钮
  CLEAR_SVG,
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
        latex: 'x^{n}',
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
      {
        name: 'subscript',
        icon: `<span class="math-symbol">x_i</span>`,
        latex: 'x_{i}',
        description: '下标',
      },
    ],
  },
  {
    id: 'superscript',
    name: '上标',
    icon: SUPERSCRIPT_SVG,
    templates: [
      {
        name: 'overline',
        icon: OVERLINE_SVG,
        latex: '\\overline{x}',
        description: 'x上横线（平均值）',
      },
      { name: 'prime', icon: PRIME_SVG, latex: 'x^{\\prime}', description: 'x的导数（一撇）' },
      {
        name: 'double_prime',
        icon: DOUBLE_PRIME_SVG,
        latex: 'x^{\\prime\\prime}',
        description: 'x的二阶导数（两撇）',
      },
      {
        name: 'triple_prime',
        icon: TRIPLE_PRIME_SVG,
        latex: 'x^{\\prime\\prime\\prime}',
        description: 'x的三阶导数（三撇）',
      },
      { name: 'dot', icon: DOT_SVG, latex: '\\dot{x}', description: 'x的一阶导数（点）' },
      {
        name: 'double_dot',
        icon: DOUBLE_DOT_SVG,
        latex: '\\ddot{x}',
        description: 'x的二阶导数（双点）',
      },
      { name: 'tilde', icon: TILDE_SVG, latex: '\\tilde{x}', description: 'x的波浪号' },
      { name: 'hat', icon: HAT_SVG, latex: '\\hat{x}', description: 'x的帽子符号' },
      { name: 'vec', icon: VEC_SVG, latex: '\\vec{x}', description: 'x的向量符号' },
      { name: 'bar', icon: BAR_SVG, latex: '\\bar{x}', description: 'x的横线' },
      { name: 'check', icon: CHECK_SVG, latex: '\\check{x}', description: 'x的反向帽子' },
      { name: 'breve', icon: BREVE_SVG, latex: '\\breve{x}', description: 'x的短音符' },
      { name: 'ring', icon: RING_SVG, latex: '\\mathring{x}', description: 'x的圆圈符号' },
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
          {
            name: 'arcsin',
            icon: `<span class="math-symbol">arcsin</span>`,
            latex: '\\arcsin(x)',
            description: 'arcsin',
          },
          {
            name: 'arccos',
            icon: `<span class="math-symbol">arccos</span>`,
            latex: '\\arccos(x)',
            description: 'arccos',
          },
          {
            name: 'arctan',
            icon: `<span class="math-symbol">arctan</span>`,
            latex: '\\arctan(x)',
            description: 'arctan',
          },
          {
            name: 'sinh',
            icon: `<span class="math-symbol">sinh</span>`,
            latex: '\\sinh(x)',
            description: 'sinh',
          },
          {
            name: 'cosh',
            icon: `<span class="math-symbol">cosh</span>`,
            latex: '\\cosh(x)',
            description: 'cosh',
          },
          {
            name: 'tanh',
            icon: `<span class="math-symbol">tanh</span>`,
            latex: '\\tanh(x)',
            description: 'tanh',
          },
        ],
      },
      { name: 'log', icon: LOG_SVG, latex: '\\log(x)', description: '对数' },
      { name: 'ln', icon: LN_SVG, latex: '\\ln(x)', description: '自然对数' },
      { name: 'exp_func', icon: EXP_FUNC_SVG, latex: 'e^{x}', description: '指数函数' },
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
      
      /* 清空按钮特殊样式 */
      .template-button[data-latex="CLEAR_BUTTON"] {
        background: #fff2f0;
        border-color: #ffccc7;
        color: #ff4d4f;
      }
      .template-button[data-latex="CLEAR_BUTTON"]:hover {
        background: #fff1f0;
        border-color: #ff4d4f;
        color: #cf1322;
      }
      .template-button[data-latex="CLEAR_BUTTON"] .math-symbol {
        color: #ff4d4f;
      }
      .template-button[data-latex="CLEAR_BUTTON"]:hover .math-symbol {
        color: #cf1322;
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
  private editMode: boolean = false
  private currentLatex: string = ''
  private editableRegions: EditableRegion[] = []

  constructor() {}

  // 切换编辑模式
  toggleEditMode(): void {
    this.editMode = !this.editMode

    // 更新按钮文本
    const $editToggle = this.$container?.find('.edit-mode-toggle')
    if ($editToggle && $editToggle[0]) {
      const button = $editToggle[0] as HTMLButtonElement
      button.textContent = this.editMode ? '预览模式' : '编辑模式'
      button.style.background = this.editMode ? '#52c41a' : '#1890ff'
    }

    // 重新渲染当前内容
    if (this.currentLatex) {
      this.renderPreview(this.currentLatex)
    }
  }

  // 创建预览区域（增加编辑模式切换按钮）
  createPreview(): Dom7Array {
    if (this.$container) {
      return this.$container
    }

    const $container = $('<div class="formula-preview-container"></div>')

    // 添加预览样式
    this.addPreviewStyles()

    // 预览标题和编辑模式切换
    const $titleRow = $('<div class="preview-title-row"></div>')
    const $title = $('<div class="preview-title">实时预览</div>')
    const $editToggle = $('<button class="edit-mode-toggle">编辑模式</button>')

    $editToggle.on('click', () => this.toggleEditMode())
    $titleRow.append($title).append($editToggle)
    $container.append($titleRow)

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
    this.currentLatex = latexString

    // 根据编辑模式选择渲染方法
    if (this.editMode) {
      this.renderEditablePreview(latexString)
    } else {
      this.renderNormalPreview(latexString)
    }
  }

  // 渲染普通预览（非编辑模式）
  private renderNormalPreview(latexString: string): void {
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

  // 渲染可编辑的预览
  renderEditablePreview(latexString: string): void {
    console.log('renderEditablePreview 被调用，参数:', latexString)
    this.currentLatex = latexString

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
      const placeholderHtml =
        '<div class="preview-placeholder">在左侧输入LaTeX公式，这里将显示预览效果</div>'
      this.$previewArea.html(placeholderHtml)
      return
    }

    try {
      // 1. 正常渲染KaTeX
      const previewElement = document.createElement('span')
      previewElement.style.display = 'inline-block'

      katex.render(latexString, previewElement, {
        throwOnError: false,
      })

      // 2. 识别可编辑区域
      this.editableRegions = this.identifyEditableRegions(latexString)

      // 3. 添加编辑热区
      this.addEditableHotspots(previewElement, latexString)

      // 4. 添加到预览区
      this.$previewArea[0].appendChild(previewElement)
      console.log('可编辑预览渲染成功，可编辑区域数量:', this.editableRegions.length)
    } catch (error) {
      console.log('可编辑预览渲染失败:', error)
      const errorMessage = error instanceof Error ? error.message : '未知错误'

      this.$errorArea.text(`语法错误: ${errorMessage}`)
      if (this.$errorArea[0]) {
        ;(this.$errorArea[0] as HTMLElement).style.display = 'block'
      }

      const rawLatexHtml = `<div class="preview-raw-latex">${latexString}</div>`
      this.$previewArea.html(rawLatexHtml)
    }
  }

  // 识别可编辑区域 - 基于括号识别，更准确
  private identifyEditableRegions(latex: string): EditableRegion[] {
    const regions: EditableRegion[] = []

    console.log('开始基于括号识别可编辑区域...')

    // 1. 函数命令中的参数 - 圆括号和大括号
    const functionPattern1 =
      /\\(exp|log|ln|sin|cos|tan|cot|sec|csc|arcsin|arccos|arctan|arccot|arcsec|arccsc|sinh|cosh|tanh)\{([^}]+)\}/g
    const functionPattern2 =
      /\\(exp|log|ln|sin|cos|tan|cot|sec|csc|arcsin|arccos|arctan|arccot|arcsec|arccsc|sinh|cosh|tanh)\(([^)]+)\)/g

    console.log('开始识别函数参数...')
    console.log('当前LaTeX字符串:', latex)

    let match

    // 处理大括号格式的函数
    while ((match = functionPattern1.exec(latex)) !== null) {
      const functionName = match[1]
      const parameter = match[2]

      console.log(`找到大括号函数: ${functionName}{${parameter}}`)

      // 检查参数是否包含可编辑内容
      if (parameter.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'function_parameter',
          value: parameter,
          startIndex: match.index + functionName.length + 2, // 跳过 "\function{"
          endIndex: match.index + functionName.length + 2 + parameter.length,
          key: `func_param_${match.index}`,
          originalLatex: match[0],
          functionName: functionName,
        })
        console.log(`添加函数参数区域: ${parameter}, 原始LaTeX: ${match[0]}`)
      }
    }

    // 处理圆括号格式的函数
    while ((match = functionPattern2.exec(latex)) !== null) {
      const functionName = match[1]
      const parameter = match[2]

      console.log(`找到圆括号函数: ${functionName}(${parameter})`)

      // 检查参数是否包含可编辑内容
      if (parameter.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'function_parameter',
          value: parameter,
          startIndex: match.index + functionName.length + 1, // 跳过 "\function("
          endIndex: match.index + functionName.length + 1 + parameter.length,
          key: `func_param_${match.index}`,
          originalLatex: match[0],
          functionName: functionName,
        })
        console.log(`添加函数参数区域: ${parameter}, 原始LaTeX: ${match[0]}`)
      }
    }

    // 2. 分数中的分子和分母 - 大括号
    const fractionPattern = /\\frac\{([^}]+)\}\{([^}]+)\}/g
    while ((match = fractionPattern.exec(latex)) !== null) {
      const numerator = match[1]
      const denominator = match[2]

      console.log(`找到分数: 分子="${numerator}", 分母="${denominator}"`)

      // 分子
      if (numerator.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'fraction_numerator',
          value: numerator,
          startIndex: match.index + 6, // 跳过 "\frac{"
          endIndex: match.index + 6 + numerator.length,
          key: `frac_num_${match.index}`,
          originalLatex: match[0],
          fractionType: 'numerator',
        })
        console.log(`添加分数分子区域: ${numerator}, 原始LaTeX: ${match[0]}`)
      }

      // 分母
      if (denominator.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'fraction_denominator',
          value: denominator,
          startIndex: match.index + 6 + numerator.length + 2, // 跳过 "\frac{...}{"
          endIndex: match.index + 6 + numerator.length + 2 + denominator.length,
          key: `frac_den_${match.index}`,
          originalLatex: match[0],
          fractionType: 'denominator',
        })
        console.log(`添加分数分母区域: ${denominator}, 原始LaTeX: ${match[0]}`)
      }
    }

    // 3. 根号中的内容 - 大括号
    const sqrtPattern = /\\sqrt\{([^}]+)\}/g
    while ((match = sqrtPattern.exec(latex)) !== null) {
      const content = match[1]

      console.log(`找到根号: \\sqrt{${content}}`)

      if (content.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'sqrt_content',
          value: content,
          startIndex: match.index + 6, // 跳过 "\sqrt{"
          endIndex: match.index + 6 + content.length,
          key: `sqrt_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加根号内容区域: ${content}, 原始LaTeX: ${match[0]}`)
      }
    }

    // 4. 下标内容 - 大括号
    const subscriptPattern = /_\{([^}]+)\}/g
    while ((match = subscriptPattern.exec(latex)) !== null) {
      const content = match[1]

      console.log(`找到下标: _{${content}}`)

      if (content.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'subscript',
          value: content,
          startIndex: match.index + 2, // 跳过 "_{"
          endIndex: match.index + 2 + content.length,
          key: `sub_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加下标区域: ${content}, 原始LaTeX: ${match[0]}`)
      }
    }

    // 5. 上标内容 - 大括号
    const superscriptPattern = /\^\{([^}]+)\}/g
    while ((match = superscriptPattern.exec(latex)) !== null) {
      const content = match[1]

      console.log(`找到上标: ^{${content}}`)

      if (content.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'superscript',
          value: content,
          startIndex: match.index + 2, // 跳过 "^{"
          endIndex: match.index + 2 + content.length,
          key: `sup_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加上标区域: ${content}, 原始LaTeX: ${match[0]}`)
      }
    }

    // 6. 上标符号中的变量 - 大括号
    const superscriptSymbolPattern1 =
      /\\(overline|dot|ddot|tilde|hat|vec|bar|check|breve|mathring)\{([^}]+)\}/g
    while ((match = superscriptSymbolPattern1.exec(latex)) !== null) {
      const symbolCommand = match[1]
      const variable = match[2]

      console.log(`找到上标符号: \\${symbolCommand}{${variable}}`)

      if (variable.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'variable',
          value: variable,
          startIndex: match.index + symbolCommand.length + 2, // 跳过 "\command{"
          endIndex: match.index + symbolCommand.length + 2 + variable.length,
          key: `sup_symbol_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加上标符号变量区域: ${variable}, 原始LaTeX: ${match[0]}`)
      }
    }

    // 6.5. 导数符号中的变量 - 如 x^{\prime}, x^{\prime\prime} 等
    const primePattern = /([a-zA-Z])\^\{(\\(?:prime|prime\\prime|prime\\prime\\prime))\}/
    while ((match = primePattern.exec(latex)) !== null) {
      const variable = match[1]
      const primeCommand = match[2]

      console.log(`找到导数符号: ${variable}^{${primeCommand}}`)

      regions.push({
        type: 'variable',
        value: variable,
        startIndex: match.index,
        endIndex: match.index + variable.length,
        key: `prime_var_${match.index}`,
        originalLatex: match[0],
      })
      console.log(`添加导数变量区域: ${variable}, 原始LaTeX: ${match[0]}`)
    }

    // 6.6. 求和符号中的变量 - 如 \sum_{i=1}^{n} x_i
    const sumPattern = /\\sum_\{([^}]+)\}\^\{([^}]+)\} ([a-zA-Z_]+)/g
    while ((match = sumPattern.exec(latex)) !== null) {
      const lower = match[1]
      const upper = match[2]
      const variable = match[3]

      console.log(`找到求和符号: \\sum_{${lower}}^{${upper}} ${variable}`)

      // 下限
      if (lower.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'subscript',
          value: lower,
          startIndex: match.index + 5, // 跳过 "\sum_{"
          endIndex: match.index + 5 + lower.length,
          key: `sum_lower_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加求和下限区域: ${lower}`)
      }

      // 上限
      if (upper.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'superscript',
          value: upper,
          startIndex: match.index + 5 + lower.length + 3, // 跳过 "\sum_{...}^{"
          endIndex: match.index + 5 + lower.length + 3 + upper.length,
          key: `sum_upper_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加求和上限区域: ${upper}`)
      }

      // 变量
      if (variable.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'variable',
          value: variable,
          startIndex: match.index + match[0].length - variable.length,
          endIndex: match.index + match[0].length,
          key: `sum_var_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加求和变量区域: ${variable}`)
      }
    }

    // 6.7. 求积符号中的变量 - 如 \prod_{i=1}^{n} x_i
    const prodPattern = /\\prod_\{([^}]+)\}\^\{([^}]+)\} ([a-zA-Z_]+)/g
    while ((match = prodPattern.exec(latex)) !== null) {
      const lower = match[1]
      const upper = match[2]
      const variable = match[3]

      console.log(`找到求积符号: \\prod_{${lower}}^{${upper}} ${variable}`)

      // 下限
      if (lower.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'subscript',
          value: lower,
          startIndex: match.index + 6, // 跳过 "\prod_{"
          endIndex: match.index + 6 + lower.length,
          key: `prod_lower_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加求积下限区域: ${lower}`)
      }

      // 上限
      if (upper.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'superscript',
          value: upper,
          startIndex: match.index + 6 + lower.length + 3, // 跳过 "\prod_{...}^{"
          endIndex: match.index + 6 + lower.length + 3 + upper.length,
          key: `prod_upper_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加求积上限区域: ${upper}`)
      }

      // 变量
      if (variable.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'variable',
          value: variable,
          startIndex: match.index + match[0].length - variable.length,
          endIndex: match.index + match[0].length,
          key: `prod_var_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加求积变量区域: ${variable}`)
      }
    }

    // 6.8. 极限符号中的变量 - 如 \lim_{x \to \infty}
    const limitPattern = /\\lim_\{([^}]+) \\to ([^}]+)\}/g
    while ((match = limitPattern.exec(latex)) !== null) {
      const variable = match[1]
      const target = match[2]

      console.log(`找到极限符号: \\lim_{${variable} \\to ${target}}`)

      // 变量
      if (variable.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'variable',
          value: variable,
          startIndex: match.index + 5, // 跳过 "\lim_{"
          endIndex: match.index + 5 + variable.length,
          key: `limit_var_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加极限变量区域: ${variable}`)
      }

      // 目标值
      if (target.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'variable',
          value: target,
          startIndex: match.index + 5 + variable.length + 5, // 跳过 "\lim_{... \\to "
          endIndex: match.index + 5 + variable.length + 5 + target.length,
          key: `limit_target_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加极限目标区域: ${target}`)
      }
    }

    // 9. 积分上下限 - 大括号
    const integralPattern = /\\int_\{([^}]+)\}\^\{([^}]+)\}/g
    while ((match = integralPattern.exec(latex)) !== null) {
      const lower = match[1]
      const upper = match[2]

      // 下限
      if (lower.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'integral_lower',
          value: lower,
          startIndex: match.index + 6, // 跳过 "\int_{"
          endIndex: match.index + 6 + lower.length,
          key: `int_lower_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加积分下限区域: ${lower}`)
      }

      // 上限
      if (upper.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'integral_upper',
          value: upper,
          startIndex: match.index + 6 + lower.length + 3, // 跳过 "\int_{...}^{"
          endIndex: match.index + 6 + lower.length + 3 + upper.length,
          key: `int_upper_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加积分上限区域: ${upper}`)
      }
    }

    // 10. 矩阵元素 - 大括号（暂时注释掉，因为s标志兼容性问题）
    // const matrixPattern = /\\begin\{matrix\}(.*?)\\end\{matrix\}/gs
    // while ((match = matrixPattern.exec(latex)) !== null) {
    //   const matrixContent = match[1]
    //   // 这里可以进一步解析矩阵内容，识别 & 分隔的元素
    //   console.log(`找到矩阵内容: ${matrixContent}`)
    //   // TODO: 可以添加矩阵元素的识别逻辑
    // }

    // 11. 识别独立的变量（不在括号内的变量）
    const independentVariablePattern = /(?<![\\{\(])([a-zA-Z])(?![\\}\)])/g
    while ((match = independentVariablePattern.exec(latex)) !== null) {
      const variable = match[1]
      const matchIndex = match.index

      // 检查这个变量是否已经被其他规则识别过
      const isAlreadyIdentified = regions.some(
        region => region.startIndex <= matchIndex && region.endIndex > matchIndex
      )

      if (!isAlreadyIdentified) {
        console.log(`找到独立变量: ${variable} 在位置 ${matchIndex}`)
        regions.push({
          type: 'variable',
          value: variable,
          startIndex: matchIndex,
          endIndex: matchIndex + 1,
          key: `indep_var_${matchIndex}`,
          originalLatex: variable,
        })
        console.log(`添加独立变量区域: ${variable}`)
      }
    }

    // 12. 识别上标符号中的变量（如 \overline{x}, \dot{x} 等）
    const superscriptSymbolPattern2 =
      /\\(overline|dot|ddot|tilde|hat|vec|bar|check|breve|mathring)\{([^}]+)\}/g
    while ((match = superscriptSymbolPattern2.exec(latex)) !== null) {
      const symbolCommand = match[1]
      const variable = match[2]

      console.log(`找到上标符号: \\${symbolCommand}{${variable}}`)

      if (variable.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'variable',
          value: variable,
          startIndex: match.index + symbolCommand.length + 2, // 跳过 "\command{"
          endIndex: match.index + symbolCommand.length + 2 + variable.length,
          key: `sup_symbol_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加上标符号变量区域: ${variable}, 原始LaTeX: ${match[0]}`)
      }
    }

    // 13. 识别下标中的变量（如 x_i, y_j 等）
    const subscriptVariablePattern = /([a-zA-Z])_\{([^}]+)\}/g
    while ((match = subscriptVariablePattern.exec(latex)) !== null) {
      const baseVariable = match[1]
      const subscript = match[2]

      console.log(`找到下标变量: ${baseVariable}_{${subscript}}`)

      // 添加基础变量
      regions.push({
        type: 'variable',
        value: baseVariable,
        startIndex: match.index,
        endIndex: match.index + 1,
        key: `base_var_${match.index}`,
        originalLatex: match[0],
      })
      console.log(`添加基础变量区域: ${baseVariable}`)

      // 添加下标内容（如果包含字母数字）
      if (subscript.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'subscript',
          value: subscript,
          startIndex: match.index + 2, // 跳过 "_{"
          endIndex: match.index + 2 + subscript.length,
          key: `sub_var_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加下标变量区域: ${subscript}`)
      }
    }

    // 14. 识别上标中的变量（如 x^n, y^m 等）
    const superscriptVariablePattern = /([a-zA-Z])\^\{([^}]+)\}/g
    while ((match = superscriptVariablePattern.exec(latex)) !== null) {
      const baseVariable = match[1]
      const superscript = match[2]

      console.log(`找到上标变量: ${baseVariable}^{${superscript}}`)

      // 添加基础变量
      regions.push({
        type: 'variable',
        value: baseVariable,
        startIndex: match.index,
        endIndex: match.index + 1,
        key: `base_var_sup_${match.index}`,
        originalLatex: match[0],
      })
      console.log(`添加基础变量区域: ${baseVariable}`)

      // 添加上标内容（如果包含字母数字）
      if (superscript.match(/[a-zA-Z0-9]/)) {
        regions.push({
          type: 'superscript',
          value: superscript,
          startIndex: match.index + 2, // 跳过 "^{"
          endIndex: match.index + 2 + superscript.length,
          key: `sup_var_${match.index}`,
          originalLatex: match[0],
        })
        console.log(`添加上标变量区域: ${superscript}`)
      }
    }

    console.log('基于括号识别完成，可编辑区域数量:', regions.length)
    console.log('识别到的可编辑区域:', regions)
    return regions
  }

  // 添加编辑热区
  private addEditableHotspots(element: HTMLElement, latex: string): void {
    console.log('开始添加编辑热区，可编辑区域数量:', this.editableRegions.length)

    // 为每个可编辑区域添加点击事件
    this.editableRegions.forEach((region, index) => {
      console.log(`处理区域 ${index}:`, region)
      const targetElement = this.findElementByText(element, region.value)
      if (targetElement) {
        console.log(`找到元素 ${index}:`, targetElement)
        this.makeElementEditable(targetElement, region)
      } else {
        console.warn(`未找到元素 ${index}:`, region)
      }
    })
  }

  // 查找包含指定文本的元素 - 改进版本
  private findElementByText(rootElement: HTMLElement, text: string): HTMLElement | null {
    console.log(`查找文本: "${text}"`)

    // 方法1: 使用 TreeWalker 查找文本节点，但更精确地匹配
    const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, null)

    let node
    while ((node = walker.nextNode())) {
      if (node.textContent && node.textContent.trim() === text) {
        console.log(`找到精确文本节点: "${node.textContent}"`)
        const parent = node.parentElement as HTMLElement
        if (parent) {
          console.log(`返回父元素:`, parent)
          return parent
        }
      }
    }

    // 方法2: 如果精确匹配失败，尝试包含匹配，但排除函数名
    console.log('精确匹配未找到，尝试包含匹配...')
    const allElements = rootElement.querySelectorAll('*')
    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i] as HTMLElement
      if (el.textContent && el.textContent.trim() === text && el.children.length === 0) {
        // 检查这个元素是否已经被标记为可编辑（避免重复处理）
        if (!el.hasAttribute('data-editable')) {
          console.log(`包含匹配找到元素:`, el)
          return el
        }
      }
    }

    // 方法3: 查找未被标记为可编辑的元素
    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i] as HTMLElement
      if (el.textContent && el.textContent.includes(text) && el.children.length === 0) {
        // 确保这个元素还没有被处理过
        if (!el.hasAttribute('data-editable')) {
          console.log(`模糊匹配找到未处理元素:`, el)
          return el
        }
      }
    }

    console.warn(`未找到包含文本 "${text}" 的未处理元素`)
    return null
  }

  // 使元素可编辑 - 改进版本
  private makeElementEditable(element: HTMLElement, region: EditableRegion): void {
    console.log(`使元素可编辑:`, element, region)

    // 添加可编辑标识
    element.setAttribute('data-editable', 'true')
    element.setAttribute('data-region-key', region.key)

    // 使用CSS类而不是内联样式，避免与KaTeX样式冲突
    element.classList.add('formula-editable-element')

    // 添加点击编辑事件
    element.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      console.log(`点击编辑元素:`, region)
      this.editValue(region, element)
    })

    // 添加提示信息
    element.title = `点击编辑: ${region.value}`

    console.log(`元素已设置为可编辑:`, element)
  }

  // 编辑值 - 直接在预览区显示可编辑文本框
  private editValue(region: EditableRegion, element: HTMLElement): void {
    console.log(`开始编辑值:`, region, element)

    // 创建可编辑的文本框
    const input = document.createElement('input')
    input.type = 'text'
    input.value = region.value
    input.className = 'formula-edit-input'

    // 设置输入框样式，使其看起来像公式的一部分
    input.style.cssText = `
      border: 2px solid #1890ff;
      border-radius: 4px;
      padding: 2px 4px;
      font-size: inherit;
      font-family: inherit;
      background: white;
      outline: none;
      min-width: 20px;
      text-align: center;
      position: absolute;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    `

    // 更精确的定位计算
    const elementRect = element.getBoundingClientRect()
    const previewArea = this.$previewArea![0] as HTMLElement
    const previewRect = previewArea.getBoundingClientRect()

    console.log('元素位置:', elementRect)
    console.log('预览区域位置:', previewRect)

    // 计算相对于预览区域的坐标
    const relativeLeft = elementRect.left - previewRect.left
    const relativeTop = elementRect.top - previewRect.top

    console.log('相对坐标:', { left: relativeLeft, top: relativeTop })

    // 设置输入框位置和尺寸
    input.style.left = `${relativeLeft}px`
    input.style.top = `${relativeTop}px`
    input.style.width = `${Math.max(elementRect.width, 30)}px`
    input.style.height = `${elementRect.height}px`

    // 确保预览区域是相对定位，这样绝对定位的输入框才能正确定位
    if (getComputedStyle(previewArea).position === 'static') {
      previewArea.style.position = 'relative'
    }

    // 将输入框添加到预览区域
    previewArea.appendChild(input)

    // 聚焦并选中文本
    input.focus()
    input.select()

    console.log(`输入框已创建并定位:`, input)
    console.log(`输入框最终位置:`, {
      left: input.style.left,
      top: input.style.top,
      width: input.style.width,
      height: input.style.height,
    })

    // 处理输入完成
    const handleComplete = () => {
      const newValue = input.value.trim()
      console.log(`编辑完成，新值: "${newValue}"`)

      if (newValue && newValue !== region.value) {
        // 更新LaTeX
        this.updateLatex(region, newValue)
      }

      // 移除输入框
      if (input.parentNode) {
        input.parentNode.removeChild(input)
      }

      console.log(`输入框已移除`)
    }

    // 回车键完成编辑
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        console.log(`按回车键完成编辑`)
        handleComplete()
      } else if (e.key === 'Escape') {
        console.log(`按ESC键取消编辑`)
        // 取消编辑，移除输入框
        if (input.parentNode) {
          input.parentNode.removeChild(input)
        }
      }
    })

    // 失去焦点时完成编辑
    input.addEventListener('blur', () => {
      console.log(`输入框失去焦点，完成编辑`)
      // 延迟处理，避免与点击事件冲突
      setTimeout(() => {
        if (input.parentNode) {
          handleComplete()
        }
      }, 100)
    })

    // 防止输入框被点击事件影响
    input.addEventListener('click', e => {
      e.stopPropagation()
    })

    console.log(`编辑事件监听器已设置`)
  }

  // 更新LaTeX - 修复版本
  private updateLatex(region: EditableRegion, newValue: string): void {
    console.log(`开始更新LaTeX:`, { region, newValue })

    let newLatex = this.currentLatex
    let updateSuccess = false

    try {
      if (region.originalLatex) {
        // 对于有原始LaTeX的结构（如函数参数、分数等），需要替换整个结构
        const oldContent = region.originalLatex
        let newContent: string

        // 根据类型构建新的内容
        switch (region.type) {
          case 'function_parameter':
            if (region.functionName) {
              // 检查是圆括号还是大括号格式
              if (oldContent.includes('(') && oldContent.includes(')')) {
                // 圆括号函数：\function(old) -> \function(new)
                console.log(
                  `更新圆括号函数参数: ${region.functionName}(${region.value}) -> ${region.functionName}(${newValue})`
                )
                newContent = oldContent.replace(/\(([^)]+)\)/, `(${newValue})`)
              } else {
                // 大括号函数：\function{old} -> \function{new}
                console.log(
                  `更新大括号函数参数: ${region.functionName}{${region.value}} -> ${region.functionName}{${newValue}}`
                )
                newContent = oldContent.replace(/\{([^}]+)\}/, `{${newValue}}`)
              }
            } else {
              // 备用方案：直接替换
              console.log(
                `更新函数参数（备用方案）: ${oldContent} -> 替换 ${region.value} 为 ${newValue}`
              )
              newContent = oldContent.replace(region.value, newValue)
            }
            console.log(`函数参数更新结果: "${oldContent}" -> "${newContent}"`)
            break

          case 'fraction_numerator':
            // 分数分子：\frac{old}{...} -> \frac{new}{...}
            // 使用更简单的方法：找到第一个大括号内的内容并替换
            const numMatch = oldContent.match(/\\frac\{([^}]+)\}\{([^}]+)\}/)
            if (numMatch) {
              newContent = oldContent.replace(
                /\\frac\{[^}]+\}\{([^}]+)\}/,
                `\\frac{${newValue}}{$1}`
              )
            } else {
              // 备用方案：直接替换
              newContent = oldContent.replace(region.value, newValue)
            }
            break

          case 'fraction_denominator':
            // 分数分母：\frac{...}{old} -> \frac{...}{new}
            // 使用更简单的方法：找到第二个大括号内的内容并替换
            const denMatch = oldContent.match(/\\frac\{([^}]+)\}\{([^}]+)\}/)
            if (denMatch) {
              newContent = oldContent.replace(
                /\\frac\{([^}]+)\}\{[^}]+\}/,
                `\\frac{$1}{${newValue}}`
              )
            } else {
              // 备用方案：直接替换
              newContent = oldContent.replace(region.value, newValue)
            }
            break

          case 'sqrt_content':
            // 根号内容：\sqrt{old} -> \sqrt{new}
            console.log(`更新根号内容: \\sqrt{${region.value}} -> \\sqrt{${newValue}}`)
            newContent = oldContent.replace(/\{([^}]+)\}/, `{${newValue}}`)
            console.log(`根号更新结果: "${oldContent}" -> "${newContent}"`)
            break

          case 'subscript':
            // 下标内容：_{old} -> _{new}
            console.log(`更新下标内容: _{${region.value}} -> _{${newValue}}`)
            newContent = oldContent.replace(/\{([^}]+)\}/, `{${newValue}}`)
            console.log(`下标更新结果: "${oldContent}" -> "${newContent}"`)
            break

          case 'superscript':
            // 上标内容：^{old} -> ^{new}
            console.log(`更新上标内容: ^{${region.value}} -> ^{${newValue}}`)
            newContent = oldContent.replace(/\{([^}]+)\}/, `{${newValue}}`)
            console.log(`上标更新结果: "${oldContent}" -> "${newContent}"`)
            break

          case 'integral_lower':
            // 积分下限：\int_{old}^{...} -> \int_{new}^{...}
            newContent = oldContent.replace(/_\{([^}]+)\}/, `_{${newValue}}`)
            break

          case 'integral_upper':
            // 积分上限：\int_{...}^{old} -> \int_{...}^{new}
            newContent = oldContent.replace(/\^\{([^}]+)\}/, `^{${newValue}}`)
            break

          default:
            // 默认情况：直接替换
            newContent = oldContent.replace(region.value, newValue)
        }

        console.log(`替换内容: "${oldContent}" -> "${newContent}"`)
        newLatex = newLatex.replace(oldContent, newContent)
        updateSuccess = true
      } else {
        // 对于没有原始LaTeX的结构，直接替换
        newLatex =
          newLatex.substring(0, region.startIndex) + newValue + newLatex.substring(region.endIndex)
        updateSuccess = true
      }

      if (updateSuccess) {
        // 更新当前LaTeX
        this.currentLatex = newLatex
        console.log(`LaTeX更新成功: "${newLatex}"`)

        // 重新渲染可编辑预览
        this.renderEditablePreview(newLatex)

        // 触发LaTeX更新事件（通知外部组件）
        this.triggerLatexUpdate(newLatex)

        // 显示成功提示
        this.showUpdateSuccess(newValue)
      }
    } catch (error) {
      console.error('LaTeX更新失败:', error)
      this.showUpdateError(error)
    }
  }

  // 显示更新成功提示
  private showUpdateSuccess(newValue: string): void {
    if (this.$errorArea && this.$errorArea[0]) {
      const errorArea = this.$errorArea[0] as HTMLElement
      errorArea.style.display = 'block'
      errorArea.style.background = '#f6ffed'
      errorArea.style.border = '1px solid #b7eb8f'
      errorArea.style.color = '#52c41a'
      errorArea.textContent = `更新成功: ${newValue}`

      // 3秒后自动隐藏
      setTimeout(() => {
        if (errorArea.parentNode) {
          errorArea.style.display = 'none'
        }
      }, 3000)
    }
  }

  // 显示更新错误提示
  private showUpdateError(error: any): void {
    if (this.$errorArea && this.$errorArea[0]) {
      const errorArea = this.$errorArea[0] as HTMLElement
      errorArea.style.display = 'block'
      errorArea.style.background = '#fff2f0'
      errorArea.style.border = '1px solid #ffccc7'
      errorArea.style.color = '#ff4d4f'
      errorArea.textContent = `更新失败: ${error.message || '未知错误'}`
    }
  }

  // 触发LaTeX更新事件 - 改进版本
  private triggerLatexUpdate(newLatex: string): void {
    console.log(`触发LaTeX更新事件:`, newLatex)

    try {
      // 创建自定义事件
      const event = new CustomEvent('latexUpdated', {
        detail: {
          latex: newLatex,
          timestamp: Date.now(),
          source: 'formula-preview',
        },
      })

      // 在预览容器上触发事件
      if (this.$container && this.$container[0]) {
        this.$container[0].dispatchEvent(event)
        console.log(`LaTeX更新事件已触发在容器上`)
      }

      // 同时在预览区域上触发事件（双重保险）
      if (this.$previewArea && this.$previewArea[0]) {
        this.$previewArea[0].dispatchEvent(event)
        console.log(`LaTeX更新事件已触发在预览区域上`)
      }

      // 尝试直接更新输入框（如果能够找到的话）
      this.tryUpdateInputField(newLatex)

      // 备用方案：尝试通过全局事件传递
      this.tryGlobalEventDispatch(newLatex)
    } catch (error) {
      console.error('触发LaTeX更新事件失败:', error)
    }
  }

  // 备用方案：通过全局事件传递
  private tryGlobalEventDispatch(newLatex: string): void {
    try {
      console.log('尝试通过全局事件传递LaTeX更新')

      // 在document上触发事件
      const globalEvent = new CustomEvent('globalLatexUpdated', {
        detail: {
          latex: newLatex,
          timestamp: Date.now(),
          source: 'formula-preview',
        },
        bubbles: true, // 允许事件冒泡
        cancelable: true,
      })

      document.dispatchEvent(globalEvent)
      console.log('全局LaTeX更新事件已触发')

      // 在window上触发事件
      const windowEvent = new CustomEvent('windowLatexUpdated', {
        detail: {
          latex: newLatex,
          timestamp: Date.now(),
          source: 'formula-preview',
        },
      })

      window.dispatchEvent(windowEvent)
      console.log('窗口LaTeX更新事件已触发')
    } catch (error) {
      console.error('全局事件传递失败:', error)
    }
  }

  // 尝试直接更新输入框 - 简化版本
  private tryUpdateInputField(newLatex: string): void {
    try {
      console.log(`开始查找并更新输入框，新LaTeX: "${newLatex}"`)

      // 立即尝试查找
      const found = this.findAndUpdateInputField(newLatex)

      if (!found) {
        console.log('立即查找失败，启动延迟查找...')

        // 延迟查找：可能DOM还没有完全渲染
        setTimeout(() => {
          console.log('延迟查找开始...')
          this.findAndUpdateInputField(newLatex)
        }, 100)

        // 再次延迟查找：双重保险
        setTimeout(() => {
          console.log('第二次延迟查找开始...')
          this.findAndUpdateInputField(newLatex)
        }, 500)
      }
    } catch (error) {
      console.error('直接更新输入框失败:', error)
    }
  }

  // 查找并更新输入框的核心逻辑
  private findAndUpdateInputField(newLatex: string): boolean {
    try {
      console.log(`开始查找LaTeX输入框，目标LaTeX: "${newLatex}"`)

      // 方法1: 查找formula模态框中的textarea
      const formulaModals = document.querySelectorAll(
        '.formula-modal-container, .formula-edit-container'
      )
      console.log(`找到 ${formulaModals.length} 个公式模态框`)

      for (let i = 0; i < formulaModals.length; i++) {
        const modal = formulaModals[i]
        const textareas = modal.querySelectorAll('textarea')
        console.log(`模态框 ${i} 中找到 ${textareas.length} 个textarea`)

        for (let j = 0; j < textareas.length; j++) {
          const textarea = textareas[j] as HTMLTextAreaElement
          console.log(`检查textarea ${j}:`, {
            id: textarea.id,
            value: textarea.value.substring(0, 50),
            placeholder: textarea.placeholder,
          })

          // 检查是否是LaTeX输入框（通过placeholder或已有内容判断）
          const isLatexField =
            textarea.placeholder?.includes('LaTeX') ||
            textarea.placeholder?.includes('公式') ||
            textarea.value.includes('\\') ||
            textarea.value.includes('{') ||
            textarea.value.includes('}')

          if (isLatexField) {
            console.log(`找到LaTeX输入框:`, textarea)

            const oldValue = textarea.value
            textarea.value = newLatex

            // 触发事件 - 兼容Dom7事件系统
            const events = ['input', 'change', 'keyup']
            events.forEach(eventType => {
              // 方法1: 原生DOM事件
              const event = new Event(eventType, { bubbles: true, cancelable: true })
              textarea.dispatchEvent(event)

              // 方法2: 使用Dom7方式触发（如果有Dom7实例）
              try {
                const $textarea = $(textarea)
                if ($textarea && $textarea.trigger) {
                  $textarea.trigger(eventType)
                }
              } catch (e) {
                console.log('Dom7触发失败，使用原生事件:', e)
              }
            })

            // 方法3: 直接模拟键盘输入来确保事件被正确触发
            this.simulateKeyboardInput(textarea, newLatex)

            // 额外触发原生事件
            textarea.focus()

            console.log(`已更新LaTeX输入框: "${oldValue}" -> "${newLatex}"`)
            return true
          }
        }
      }

      // 方法2: 如果方法1失败，查找所有可能的LaTeX输入框
      console.log('方法1失败，尝试方法2: 全局搜索LaTeX输入框')
      const allTextareas = document.querySelectorAll('textarea')
      console.log(`全局找到 ${allTextareas.length} 个textarea`)

      for (let i = 0; i < allTextareas.length; i++) {
        const textarea = allTextareas[i] as HTMLTextAreaElement
        const fieldValue = textarea.value || ''

        // 更精确的LaTeX检测：检查是否包含当前编辑的LaTeX的基础部分
        const isLatexField =
          fieldValue.includes('\\sin') ||
          fieldValue.includes('\\cos') ||
          fieldValue.includes('\\tan') ||
          fieldValue.includes('\\log') ||
          fieldValue.includes('\\ln') ||
          fieldValue.includes('\\exp') ||
          fieldValue.includes('\\frac') ||
          fieldValue.includes('\\sqrt') ||
          fieldValue.length === 0 // 空的输入框也可能是目标

        if (isLatexField) {
          console.log(`通过全局搜索找到LaTeX输入框:`, textarea)

          const oldValue = textarea.value
          textarea.value = newLatex

          // 触发事件
          const events = ['input', 'change', 'keyup']
          events.forEach(eventType => {
            const event = new Event(eventType, { bubbles: true, cancelable: true })
            textarea.dispatchEvent(event)
          })

          textarea.focus()

          console.log(`已更新LaTeX输入框: "${oldValue}" -> "${newLatex}"`)
          return true
        }
      }

      console.log('未找到合适的LaTeX输入框')
      return false
    } catch (error) {
      console.error('查找并更新输入框失败:', error)
      return false
    }
  }

  // 模拟键盘输入 - 更真实地触发输入事件
  private simulateKeyboardInput(textarea: HTMLTextAreaElement, newLatex: string): void {
    try {
      console.log('开始模拟键盘输入，目标值:', newLatex)

      // 先清空
      textarea.value = ''
      textarea.focus()

      // 模拟逐字符输入
      for (let i = 0; i < newLatex.length; i++) {
        textarea.value = newLatex.substring(0, i + 1)

        // 触发多种输入事件
        const inputEvent = new InputEvent('input', {
          bubbles: true,
          cancelable: true,
          data: newLatex.charAt(i),
          inputType: 'insertText',
        })
        textarea.dispatchEvent(inputEvent)

        // 同时触发keyup事件
        const keyupEvent = new KeyboardEvent('keyup', {
          bubbles: true,
          cancelable: true,
          key: newLatex.charAt(i),
        })
        textarea.dispatchEvent(keyupEvent)
      }

      // 最后触发change事件
      const changeEvent = new Event('change', { bubbles: true, cancelable: true })
      textarea.dispatchEvent(changeEvent)

      console.log('键盘输入模拟完成')
    } catch (error) {
      console.error('模拟键盘输入失败:', error)
    }
  }

  // 手动触发输入更新 - 直接模拟输入事件的效果
  private triggerManualInputUpdate(textarea: HTMLTextAreaElement, newLatex: string): void {
    try {
      console.log('尝试手动触发输入更新')

      // 查找包含这个textarea的模态框容器
      let container = textarea.parentElement
      while (
        container &&
        !container.classList.contains('formula-modal-container') &&
        !container.classList.contains('formula-edit-container')
      ) {
        container = container.parentElement
      }

      if (container) {
        console.log('找到模态框容器:', container)

        // 查找预览面板并直接调用renderPreview
        const previewContainers = container.querySelectorAll('.formula-preview-container')
        previewContainers.forEach(previewContainer => {
          // 尝试通过全局变量或DOM属性找到对应的FormulaPreview实例
          const event = new CustomEvent('manualLatexUpdate', {
            detail: { latex: newLatex },
            bubbles: true,
          })
          previewContainer.dispatchEvent(event)
        })

        // 额外尝试：通过window对象查找编辑器实例
        const globalWindow = window as any
        if (globalWindow.editor && globalWindow.editor.getMenus) {
          const menus = globalWindow.editor.getMenus()
          const insertMenu = menus.find((m: any) => m.title && m.title.includes('formula'))
          if (insertMenu && insertMenu.previewPanel) {
            insertMenu.previewPanel.renderPreview(newLatex)
            console.log('通过编辑器实例直接更新预览')
          }
        }
      }
    } catch (error) {
      console.error('手动触发输入更新失败:', error)
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
      .preview-title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
      .edit-mode-toggle {
        padding: 8px 12px;
        background: #1890ff;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: background-color 0.2s;
      }
      .edit-mode-toggle:hover {
        background: #40a9ff;
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
        position: relative; /* 确保支持绝对定位的子元素 */
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
      
      /* 编辑模式相关样式 */
      .formula-edit-input {
        border: 2px solid #1890ff !important;
        border-radius: 4px !important;
        padding: 2px 4px !important;
        font-size: inherit !important;
        font-family: inherit !important;
        background: white !important;
        outline: none !important;
        min-width: 20px !important;
        text-align: center !important;
        position: absolute !important;
        z-index: 1000 !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
      }
      
      /* 可编辑元素的基础样式 */
      .formula-editable-element {
        cursor: pointer !important;
        background-color: rgba(24, 144, 255, 0.1) !important;
        border-radius: 2px !important;
        padding: 1px 2px !important;
        transition: background-color 0.2s !important;
        position: relative !important;
      }
      
      /* 可编辑元素的悬停效果 */
      .formula-editable-element:hover {
        background-color: rgba(24, 144, 255, 0.2) !important;
      }
      
      /* 可编辑元素的激活状态 */
      .formula-editable-element:active {
        background-color: rgba(24, 144, 255, 0.3) !important;
      }
    `
    document.head.appendChild(style)
  }
}
