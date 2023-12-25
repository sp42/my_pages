window.addEventListener('resize', function () {
    window.parent.resizeIframe();
});


var tagRegex = /&lt;([^&]+)&gt;/g;
var attributeRegex = /(\w+)\s*=\s*["']([^"']*)["']/g;
var getValue = /\="([^"]*)"/;

function matchAttrib(_m) {
    _m = _m.replace(getValue, '=<span class="xml-string">"$1"</span>');

    return '<span class="xml-attribute">' + _m + '</span>';
}

function match1(match, b, c) {
    if (match.indexOf('&lt;!') != -1)
        return '<span class="xml-comment">' + match + '</span>';
    else {
        match = match.replace(attributeRegex, matchAttrib);

        return '<span class="xml-tag">' + match + '</span>';
    }
}

// SQL DDL 关键字
var ddlKeywords = [
    "CREATE",
    "TABLE",
    "PRIMARY",
    "KEY",
    "FOREIGN",
    "CONSTRAINT",
    "NOT",
    "NULL",
    "UNIQUE"
];

// SQL 关键字
var sqlKeywords = [
    "SELECT",
    "FROM",
    "WHERE",
    "LIKE",
    "BETWEEN",
    "NOT",
    "FALSE",
    "NULL",
    "TRUE",
    "IN",
    "INSERT",
    "INTO",
    "VALUES"
];

// 高亮 SQL DDL 关键字
function highlightDDLKeywords(text, isSqlDDL) {
    var words = text.split(' ');
    var highlightedText = '';

    words.forEach(function (word) {

        if ((isSqlDDL ? ddlKeywords : sqlKeywords).includes(word.trim().toUpperCase()))
            highlightedText += '<span class="sql-ddl-keyword">' + word + '</span> ';
        else
            highlightedText += word + ' ';
    });

    return highlightedText;
}

const matchString = /'[^']*'/g;
const matchSqlField = /`[^`]*`/g;

function highlightXML() {
    var codeElement = document.querySelectorAll('.xml-code');

    codeElement && codeElement.length && codeElement.forEach(item => {
        var xmlCode = item.innerHTML;
        // 替换特殊字符
        xmlCode = xmlCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(tagRegex, match1);

        // 将处理后的内容重新放回 <code> 元素中
        item.innerHTML = xmlCode;
    });

    codeElement = document.querySelectorAll('.sql-ddl-code');

    codeElement && codeElement.length && codeElement.forEach(item => {
        let code = item.innerHTML;
        code = code.replace(matchString, m => `<span class="code-string">${m}</span>`);
        code = code.replace(matchSqlField, m => `<span class="sql-field">${m}</span>`);

        item.innerHTML = highlightDDLKeywords(code, true);
    });

    codeElement = document.querySelectorAll('.sql-code');

    codeElement && codeElement.length && codeElement.forEach(item => {
        let code = item.innerHTML;
        code = code.replace(matchString, m => `<span class="code-string">${m}</span>`);
        code = code.replace(matchSqlField, m => `<span class="sql-field">${m}</span>`);

        item.innerHTML = highlightDDLKeywords(code);
    });
}

// 页面加载完成后，调用 highlightXML 函数
window.onload = highlightXML;