odoo.define('test_module.HadiahButton', function(require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { useListener } = require("@web/core/utils/hooks");
    const Registries = require('point_of_sale.Registries');

    class HadiahButton extends PosComponent {
        setup() {
            super.setup();
            useListener('click', this.onClick);
        }

        async onClick() {
            const hadiahProduct = await this.env.services.rpc({
                model: 'product.hadiah',
                method: 'search_read',
                args: [[], ['product_id']],
            });

            if (!hadiahProduct.length) {
                this.showPopup('ErrorPopup', {
                    title: 'Info',
                    body: 'Tidak ada hadiah tersedia.',
                });
                return;
            }

            const items = hadiahProduct.map(h => ({
                id: h.product_id[0],
                item: h.product_id,
                label: h.product_id[1],
            }));
            

            const { confirmed, payload: selectedItem } = await this.showPopup('SelectionPopup', {
                title: 'Pilih Hadiah',
                list: items,
                confirmText: 'Add',
                cancelText: 'Cancel',
            });

            if (confirmed && selectedItem) {
                const order = this.env.pos.get_order();
                const productId = await this.env.services.rpc({
                    model: 'product.product',
                    method: 'search_read',
                    args: [[['product_tmpl_id', '=', selectedItem[0]]], ['id']],
                });
                const productProduct = this.env.pos.db.get_product_by_id(productId[0].id);

                if (productProduct) {
                    order.add_product(productProduct, {
                        price: 1,
                    });
                } else {
                    this.showPopup('ErrorPopup', {
                        title: 'Info',
                        body: 'Hadiah tidak ditemukan.',
                    });
                    return;
                }
            }
        }
    }

    HadiahButton.template = 'HadiahButton';
    Registries.Component.add(HadiahButton);
    return HadiahButton;
});
