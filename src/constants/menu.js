import { IconLayoutDashboard, IconShoppingCart, IconFileCheck, IconWriting, IconFileCertificate, IconExchange, IconUsers, IconGift } from '@tabler/icons';

const menu_items = [{
    title: 'KYC',
    type: 'group',
    children: [
        {
            target: true,
            external: true,
            title: 'Register',
            id: 'register',
            url: 'https://contakt.ceewen.xyz/',
            icon: IconFileCertificate
        }
    ]
}, {
    title: 'App',
    type: 'group',
    children: [
        {
            title: 'Home',
            id: 'home',
            url: '/home',
            icon: IconLayoutDashboard
        }, {
            title: 'Purchase',
            id: 'purchase',
            url: '/purchase',
            icon: IconShoppingCart
        }, {
            title: 'Underwriting',
            id: 'underwriting',
            url: '/underwriting',
            icon: IconWriting
        }, {
            title: 'Rewards',
            id: 'rewards',
            url: '/rewards',
            icon: IconGift
        }, {
            title: 'Claim',
            id: 'claim',
            url: '/claim',
            icon: IconFileCheck
        }, {
            target: true,
            external: true,
            title: 'Swap',
            id: 'swap',
            url: 'https://app.uniswap.org/#/swap',
            icon: IconExchange
        }, {
            target: true,
            external: true,
            title: 'Governance',
            id: 'governance',
            url: 'https://snapshot.org/#/',
            icon: IconUsers
        }]
}]

export default menu_items