import ButtonUi from './Button';

export default {
    title: 'Button',
    component: ButtonUi,
    argTypes: {
        //backgroundColor: { control: 'color' },
        styleButton: { control: { type: 'select', options: ['primary', 'secondary', 'outline'] } },
        shape: { control: { type: 'select', options: ['button', 'icon'] } },
        size: { control: { type: 'select', options: ['small', 'standard', 'large', 'x-large'] } },
    },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { ButtonUi },
    template: '<button-ui link="/home" v-bind="$props"/>',
});

export const Primary = Template.bind({});
Primary.args = {
    styleButton: 'primary',
    shape: 'button',
    text: 'Button32',
    size: 'standard',
    iconDisplayed: true,
    icon: 'icon-cart',
    fullWidth: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
    styleButton: 'secondary',
    shape: 'button',
    text: 'Button',
    size: 'standard',
    iconDisplayed: true,
    icon: 'icon-cart',
    fullWidth: false,
};

export const Outline = Template.bind({});
Outline.args = {
    styleButton: 'outline',
    shape: 'button',
    text: 'Button',
    size: 'standard',
    iconDisplayed: true,
    icon: 'icon-cart',
    fullWidth: false,
};
