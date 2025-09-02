/**
 * @description 测试修复后的公式模板识别功能
 */

import { FormulaPreview } from '../../../src/module/menu/FormulaTemplates'

describe('FormulaTemplates - 修复后的识别功能', () => {
  let formulaPreview: FormulaPreview

  beforeEach(() => {
    formulaPreview = new FormulaPreview()
  })

  describe('常用模板识别', () => {
    it('应该识别分数 \\frac{a}{b} 中的变量', () => {
      const latex = '\\frac{a}{b}'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(2)
      expect(regions[0].value).toBe('a')
      expect(regions[1].value).toBe('b')
    })

    it('应该识别开方 \\sqrt{x} 中的变量', () => {
      const latex = '\\sqrt{x}'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0].value).toBe('x')
    })

    it('应该识别指数 x^{n} 中的变量', () => {
      const latex = 'x^{n}'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0].value).toBe('n')
    })

    it('应该识别极限 \\lim_{x \\to \\infty} 中的变量', () => {
      const latex = '\\lim_{x \\to \\infty}'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(2)
      expect(regions[0].value).toBe('x')
      expect(regions[1].value).toBe('\\infty')
    })

    it('应该识别下标 x_{i} 中的变量', () => {
      const latex = 'x_{i}'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0].value).toBe('i')
    })
  })

  describe('函数模板识别', () => {
    it('应该识别三角函数 \\sin(x) 中的变量', () => {
      const latex = '\\sin(x)'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0].value).toBe('x')
    })

    it('应该识别对数函数 \\log(x) 中的变量', () => {
      const latex = '\\log(x)'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0].value).toBe('x')
    })

    it('应该识别双曲函数 \\sinh(x) 中的变量', () => {
      const latex = '\\sinh(x)'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0].value).toBe('x')
    })

    it('应该识别反三角函数 \\arcsin(x) 中的变量', () => {
      const latex = '\\arcsin(x)'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0].value).toBe('x')
    })
  })

  describe('上标模板识别', () => {
    it('应该识别上标符号 \\overline{x} 中的变量', () => {
      const latex = '\\overline{x}'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0].value).toBe('x')
    })

    it('应该识别导数符号 x^{\\prime} 中的变量', () => {
      const latex = 'x^{\\prime}'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0].value).toBe('x')
    })

    it('应该识别点导数 \\dot{x} 中的变量', () => {
      const latex = '\\dot{x}'
      const regions = (formulaPreview as any).identifyEditableRegions(latex)

      expect(regions).toHaveLength(1)
      expect(regions[0].value).toBe('x')
    })
  })
})
