export const focus = {
    bind(el) {
        el._mouseHandler = function () {
            el.style.outline = 'none';
        };
        el._keyHandler = function (e) {
            el.style.outline = '';
            if (e.code === 'Tab') el.focus();
        };
        window.addEventListener('mousedown', el._mouseHandler);
        el.addEventListener('keyup', el._keyHandler);
    },
    unbind(el) {
        window.removeEventListener('mousedown', el._mouseHandler);
        el.removeEventListener('keyup', el._keyHandler);
    },
};

export const willChange = {
    bind(el, binding) {
        binding.name = 'will-change';
        el._willChangeActive = function () {
            const label = el.getElementsByClassName('will-change');
            label[0].style.willChange = binding.value;
        };
        el._willChangeAuto = function () {
            const label = el.getElementsByClassName('will-change');
            label[0].style.willChange = 'auto';
        };
        el.addEventListener('mouseenter', el._willChangeActive);
        el.addEventListener('transitionend', el._willChangeAuto);
    },
    unbind(el) {
        el.removeEventListener('mouseenter', el._willChangeActive);
        el.removeEventListener('transitionend', el._willChangeAuto);
    },
};
