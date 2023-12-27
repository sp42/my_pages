window.addEventListener('resize', function () {
    window.parent.resizeIframe();
});


const tagRegex = /&lt;([^&]+)&gt;/g;
const attributeRegex = /(\w+)\s*=\s*["']([^"']*)["']/g;
const getValue = /\="([^"]*)"/;

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
const ddlKeywords = [
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
const sqlKeywords = [
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


// Java 关键字
const javaKeywordsRegex = /\b(new|return|public|static|class|void|int|boolean|if|else|while|for|switch|case|break|default|try|catch|finally|throw|throws|private|protected|package|import|interface|implements|extends|this|super|instanceof|final|abstract|synchronized|volatile)\b/g;
const matchJavaAnn = /@\w+/;

const matchString = /'[^']*'/g;
const matchString2 = /"[^"]*"/g;
const matchSqlField = /`[^`]*`/g;

// 匹配 YAML 键名
const keyRegex = /^(\s*)(\w+)(\s*):/gm;
// 匹配 YAML 字符串值
const valueRegex = /(['"])(.*?)\1/g;

function highlightCode() {
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

    codeElement = document.querySelectorAll('.java-code');

    codeElement && codeElement.length && codeElement.forEach(item => {
        let code = item.innerHTML;
        code = code.replace(matchString2, m => `<span Class="code-string">${m}</span>`);
        code = code.replace(javaKeywordsRegex, '<span class="java-keyword">$1</span>');
        code = code.replace(matchJavaAnn, m => `<span class="java-anno">${m}</span>`);

        item.innerHTML = code;
    });

    codeElement = document.querySelectorAll('.yaml-code');

    codeElement && codeElement.length && codeElement.forEach(item => {
        let code = item.innerHTML;

        const yamlKeywords = ["true", "false", "null"];

        // YAML语法规则的正则表达式
        const regex = /(:|\s+|-|#.*$|".*"|'.*'|\d+|\btrue\b|\bfalse\b|\bnull\b)/g;

        // 将文本中的关键字和字符串用<span>标签包裹起来
        code = code.replace(regex, function (match) {
            if (yamlKeywords.includes(match))
                return '<span class="yaml-keyword">' + match + '</span>';
            else if (match.startsWith('#'))
                return '<span class="yaml-comment">' + match + '</span>';
            else if (match.startsWith('"') || match.startsWith("'"))
                return '<span class="yaml-string">' + match + '</span>';
            else
                return match;
        });

        item.innerHTML = code;
    });
}

// 页面加载完成后，调用 highlightCode 函数
document.addEventListener('DOMContentLoaded', highlightCode);