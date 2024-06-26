function resizeIframe() {

    var iframe = document.getElementById('iframe');
    let h = iframe.contentWindow.document.body.scrollHeight;
    h += 360;

    iframe.style.height = h + 'px';
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

    let footer = `
    <div>AJ-Framework 家族项目：<br /><a target="_blank" href="../aj/">AJ-Framework 基础框架库</a> | <a target="_blank" href="../data-service/">数据服务 DataService 一站式快速 CRUD 服务 </a> |
        <a target="_blank" href="../iam/">AJ-IAM 轻量级 OIDC 用户认证系统</a>  |
        <a target="_blank" href="../workflow/">AJ-Workflow 轻量级工作流引擎</a>  
       <!--  | <a target="_blank" href="../base/">AJ-Base 常见的业务封装</a> -->
    </div>
    <br />
    Copyright © 2023 Frank Cheung. All Rights Reserved.
`;
    let temp = document.createElement('footer');
    temp.innerHTML = footer;
    let div = document.querySelector('body>div');
    div.parentNode.insertBefore(temp, div.nextSibling);
});

/* 百度统计 */
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?061f86e97629f2d5b916a718bf2fe516";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

document.addEventListener('DOMContentLoaded', function () {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var section = urlParams.get('section');
    if (section) {
        var t = document.querySelector('.' + section);
        t.classList.add('selected');
        document.querySelector('iframe').src = t.querySelector('a').href;
    }
});