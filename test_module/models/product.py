from odoo import api, fields, models, _
from odoo.exceptions import UserError
import logging

class ProductHadiah(models.Model):
    _name = 'product.hadiah'

    product_id = fields.Many2one('product.template', string="Product")

class ProductTemplate(models.Model):
    _inherit = 'product.template'

    is_hadiah = fields.Boolean(string="Hadiah")

    def write(self, vals):
        res = super(ProductTemplate, self).write(vals)

        for product in self:
            if 'is_hadiah' in vals.keys():
                if vals.get('is_hadiah') == True:
                    self.env['product.hadiah'].sudo().create({'product_id': product.id})
                else:
                    temp = self.env['product.hadiah'].sudo().search([('product_id', '=', product.id)])
                    if temp:
                        temp.unlink()

        return res