/**
 * @description 测试函数编辑修复
 */

import { FormulaPreview } from '../../../src/module/menu/FormulaTemplates'

describe('FormulaTemplates - 函数编辑修复', () => {
  let formulaPreview: FormulaPreview

  beforeEach(() => {
    formulaPreview = new FormulaPreview()
  })

  describe('函数参数编辑', () => {
    it('应该正确识别 log(x) 中的变量 x', () => {
      const latex = '\\log(x)'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0]).toEqual({
        type: 'function_parameter',
        value: 'x',
        startIndex: 5, // \log( 的长度
        endIndex: 6,
        key: 'func_param_0',
        originalLatex: '\\log(x)',
        functionName: 'log',
      })
    })

    it('应该正确识别 sin(x) 中的变量 x', () => {
      const latex = '\\sin(x)'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0]).toEqual({
        type: 'function_parameter',
        value: 'x',
        startIndex: 5, // \sin( 的长度
        endIndex: 6,
        key: 'func_param_0',
        originalLatex: '\\sin(x)',
        functionName: 'sin',
      })
    })

    it('应该正确识别 arcsin(x) 中的变量 x', () => {
      const latex = '\\arcsin(x)'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0]).toEqual({
        type: 'function_parameter',
        value: 'x',
        startIndex: 8, // \arcsin( 的长度
        endIndex: 9,
        key: 'func_param_0',
        originalLatex: '\\arcsin(x)',
        functionName: 'arcsin',
      })
    })

    it('应该正确识别 sinh(x) 中的变量 x', () => {
      const latex = '\\sinh(x)'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0]).toEqual({
        type: 'function_parameter',
        value: 'x',
        startIndex: 6, // \sinh( 的长度
        endIndex: 7,
        key: 'func_param_0',
        originalLatex: '\\sinh(x)',
        functionName: 'sinh',
      })
    })
  })

  describe('函数参数更新', () => {
    it('应该正确更新 log(x) 为 log(1)', () => {
      const latex = '\\log(x)'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)
      const region = regions[0]

      // 设置当前LaTeX
      ;(formulaPreview as any).currentLatex = latex

      // 执行更新
      ;(formulaPreview as any).updateLatex(region, '1')

      // 检查更新结果
      expect((formulaPreview as any).currentLatex).toBe('\\log(1)')
    })

    it('应该正确更新 sin(x) 为 sin(y)', () => {
      const latex = '\\sin(x)'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)
      const region = regions[0]

      // 设置当前LaTeX
      ;(formulaPreview as any).currentLatex = latex

      // 执行更新
      ;(formulaPreview as any).updateLatex(region, 'y')

      // 检查更新结果
      expect((formulaPreview as any).currentLatex).toBe('\\sin(y)')
    })

    it('应该正确更新 arcsin(x) 为 arcsin(z)', () => {
      const latex = '\\arcsin(x)'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)
      const region = regions[0]

      // 设置当前LaTeX
      ;(formulaPreview as any).currentLatex = latex

      // 执行更新
      ;(formulaPreview as any).updateLatex(region, 'z')

      // 检查更新结果
      expect((formulaPreview as any).currentLatex).toBe('\\arcsin(z)')
    })
  })
})
