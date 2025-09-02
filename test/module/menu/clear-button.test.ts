/**
 * @description 测试清空按钮功能
 */

import { FormulaTemplatePanel } from '../../../src/module/menu/FormulaTemplates'

describe('FormulaTemplatePanel - 清空按钮', () => {
  let formulaTemplatePanel: FormulaTemplatePanel

  beforeEach(() => {
    formulaTemplatePanel = new FormulaTemplatePanel()
  })

  describe('清空按钮配置', () => {
    it('应该在常用标签下包含清空按钮', () => {
      const panel = formulaTemplatePanel.createPanel()

      // 查找清空按钮
      const clearButton = panel.find('.template-button[data-latex="CLEAR_BUTTON"]')

      expect(clearButton.length).toBe(1)
      expect(clearButton.find('.template-name').text()).toBe('清空')
    })

    it('清空按钮应该使用垃圾桶图标', () => {
      const panel = formulaTemplatePanel.createPanel()

      const clearButton = panel.find('.template-button[data-latex="CLEAR_BUTTON"]')
      const icon = clearButton.find('.math-symbol')

      expect(icon.text()).toBe('🗑️')
    })

    it('清空按钮应该有特殊的样式类', () => {
      const panel = formulaTemplatePanel.createPanel()

      const clearButton = panel.find('.template-button[data-latex="CLEAR_BUTTON"]')

      // 检查是否有特殊的样式属性
      expect(clearButton.attr('data-latex')).toBe('CLEAR_BUTTON')
      expect(clearButton.attr('title')).toBe('清空')
    })
  })

  describe('清空按钮样式', () => {
    it('清空按钮应该有特殊的CSS样式', () => {
      // 检查CSS样式是否被添加
      const styleElement = document.getElementById('formula-template-styles')
      expect(styleElement).not.toBeNull()

      if (styleElement) {
        const styleContent = styleElement.textContent || ''
        expect(styleContent).toContain('CLEAR_BUTTON')
        expect(styleContent).toContain('background: #fff2f0')
        expect(styleContent).toContain('border-color: #ffccc7')
        expect(styleContent).toContain('color: #ff4d4f')
      }
    })
  })
})
