function resizeIframe() {
    var iframe = document.getElementById('iframe');
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('body>div>menu').onclick = (e) => {
        let el = e.target;
        if (el.tagName != 'A')
            return;

        el = el.parentNode;

        let selected = document.querySelector('li.selected');
        selected && selected.classList.remove('selected');
        el.classList.add('selected');
    };
});