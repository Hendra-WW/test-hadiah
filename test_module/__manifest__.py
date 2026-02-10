# -*- coding: utf-8 -*-

{
    'name': 'Product Hadiah',
    'version': '1.0.0',
    'category': 'Inventory',
    'summary': 'Testing product hadiah',
    'description': """""",
    'depends': [
        'stock',
        'point_of_sale',
        'pos_sale',
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/product.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'test_module/static/src/js/pos.js',
            'test_module/static/src/js/hadiahButton.js',
            'test_module/static/src/xml/hadiahButton.xml',
        ],
    },
    'installable': True,
    'license': 'LGPL-3',
}
