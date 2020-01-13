module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    // 强制 getter 和 setter 在对象中成对出现
    'accessor-pairs': 2,
    // 强制箭头函数的箭头前后使用一致的空格，true：开启空格，false：不开启空格
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 禁止或强制在代码块中开括号前和闭括号后有空格，'always': 强制开闭空格，'never': 禁用空格
    'block-spacing': [2, 'always'],
    // 强制在代码块中使用一致的大括号风格，http://eslint.cn/docs/rules/brace-style
    'brace-style': [2, '1tbs'],
    // 强制属性名称为驼峰风格，常量忽略，http://eslint.cn/docs/rules/camelcase
    camelcase: [
      1,
      {
        properties: 'always'
      }
    ],
    // 禁止使用拖尾逗号，结束时不应该有逗号
    'comma-dangle': [2, 'never'],
    // 逗号前没有空格，逗号后由空格
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    // 禁止出现空函数，如果是需要后续做，可以在函数内部写一条注释
    'no-empty-function': 2,
    // 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
    'comma-style': [2, 'last'],
    // 要求在构造函数中有 super() 的调用
    'constructor-super': 2,
    // if, else, for, while, do, 后必须有大括号
    curly: [2, 'all'],
    // 要求点操作符和属性放在同一行
    'dot-location': [2, 'property'],
    // 在非空文件末尾至少存在一行空行
    'eol-last': 2,
    // 用'===', '!=='代替'==', '!='，null 除外；
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    // 要求回调函数中有容错处理
    'handle-callback-err': [2, '^(err|error)$'],
    // 强制行的最大长度是80
    code: '80',
    // 缩进使用tab
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1
      }
    ],
    // 强制在 JSX 属性中一致地使用单引号
    'jsx-quotes': [2, 'prefer-single'],
    // 禁止在对象字面量的键和冒号之间存在空格,要求在对象字面量的冒号和值之间存在至少有一个空格
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    // 强制关键字前后有空格
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 要求构造函数首字母大写
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    // 强制括号后的新构造函数没有参数，http://eslint.cn/docs/rules/new-parens
    'new-parens': 2,
    // 禁用 arguments.caller 或 arguments.callee
    'no-caller': 2,
    'no-console': 'off',
    // 不允许修改类声明的变量，http://eslint.cn/docs/rules/no-class-assign
    'no-class-assign': 2,
    // 禁止在条件语句中出现赋值操作符
    'no-cond-assign': 2,
    // 禁止修改 const 声明的变量
    'no-const-assign': 2,
    'no-control-regex': 0,
    // 禁止删除变量，可以使用delete删除对象的属性
    'no-delete-var': 2,
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 2,
    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 2,
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止使用空解构模式
    'no-empty-pattern': 2,
    // 禁用 eval()
    'no-eval': 2,
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 2,
    // 不要在内置对象的原型上添加方法，如Array, Date；
    'no-extend-native': 2,
    // 不要在一些不需要的地方加括号，例：delete(a.b)；
    'no-extra-parens': [2, 'functions'],
    // 禁止 case 语句落空
    'no-fallthrough': 2,
    // 禁止小数点不写0
    'no-floating-decimal': 2,
    // 禁止对 function 声明重新赋值
    'no-func-assign': 2,
    // 禁止使用类似 eval() 的方法
    'no-implied-eval': 2,
    // 禁止在嵌套的语句块中出现 function 声明
    'no-inner-declarations': [2, 'functions'],
    // 禁止不规则的空白
    'no-irregular-whitespace': 2,
    // 禁用 __iterator__ 属性
    'no-iterator': 2,
    // 禁用标签语句
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    // 禁用不必要的嵌套块
    'no-lone-blocks': 2,
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 2,
    // 禁止使用多个空格
    'no-multi-spaces': 2,
    // 禁止使用多行字符串
    'no-multi-str': 2,
    // 禁止出现多行空行
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ],
    // 禁止使用 Object 构造函数
    'no-new-object': 2,
    // 禁止调用 require 时使用 new 操作符
    'no-new-require': 2,
    // 禁止 Symbolnew 操作符和 new 一起使用
    'no-new-symbol': 2,
    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-new-wrappers': 2,
    // 禁止把全局对象作为函数调用
    'no-obj-calls': 2,
    // 禁用八进制字面量
    'no-octal': 2,
    // 禁止在字符串中使用八进制转义序列
    'no-octal-escape': 2,
    // 当使用 _dirname 和 _filename 时不允许字符串拼接，要使用path.resolve
    'no-path-concat': 2,
    // 禁用 __proto__ 属性
    'no-proto': 2,
    // 禁止多次声明同一变量
    'no-redeclare': 2,
    // 禁止在 return 语句中使用赋值语句
    'no-return-assign': [2, 'except-parens'],
    // 禁止自我赋值
    'no-self-assign': 2,
    // 禁止自身比较
    'no-self-compare': 2,
    // 禁用逗号操作符
    'no-sequences': 2,
    // 禁止将标识符定义为受限的名字
    'no-shadow-restricted-names': 2,
    // 函数调用括号前不要加空格
    'no-spaced-func': 2,
    // 数组中禁止有空数据
    'no-sparse-arrays': 2,
    // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-this-before-super': 2,
    // 禁止抛出异常字面量
    'no-throw-literal': 2,
    // 禁用行尾空格
    'no-trailing-spaces': 2,
    // 此规则可帮助你定位由变量漏写、参数名漏写和意外的隐式全局变量声明所导致的潜在引用错误
    'no-undef': 2,
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止出现令人困惑的多行表达式，表达式之后加分号
    'no-unexpected-multiline': 2,
    // 循环条件中的变量在循环中是要经常改变的
    'no-unmodified-loop-condition': 2,
    // 禁止可以在有更简单的可替代的表达式时使用三元操作符，能使用逻辑表达式就使用逻辑表达式
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ],
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 2,
    // 禁止在 finally 语句块中出现控制流语句
    'no-unsafe-finally': 2,
    // 禁止出现未使用过的变量，不检查函数参数
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    // 禁止不必要的 .call() 和 .apply()
    'no-useless-call': 2,
    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 2,
    // 禁用不必要的构造函数
    'no-useless-constructor': 2,
    // 禁用不必要的转义字符
    'no-useless-escape': 0,
    // 禁止属性前有空白
    'no-whitespace-before-property': 2,
    // 禁用 with 语句
    'no-with': 2,
    // 函数中的变量声明合并成一个
    'one-var': [
      2,
      {
        uninitialized: 'consecutive'
      }
    ],
    // 要求把换行符放在操作符后面
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    // 禁止块语句和类的开始或末尾有空行
    'padded-blocks': [2, 'never'],
    // 使用单引号
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    // 要求语句末尾使用分号
    semi: [2, 'always'],
    // 分号之前没有空格，之后有空格
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    // 块语句必须总是至少有一个前置空格
    'space-before-blocks': [2, 'always'],
    // function的左括号之前不加空格
    'space-before-function-paren': [2, 'never'],
    // 强制圆括号内没有空格
    'space-in-parens': [2, 'never'],
    // 要求中缀操作符周围有空格
    'space-infix-ops': 2,
    // 要求中缀操作符周围有空格，new、delete、typeof、void、yield加空格，-、+、--、++、!、!!不加空格
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    // 注释后必须跟随至少一个空白
    'spaced-comment': [
      2,
      'always',
      {
        markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }
    ],
    // 禁止模板字符串中的变量{}内出现空格
    'template-curly-spacing': [2, 'never'],
    // 需要使用isNaN检查NaN
    'use-isnan': 2,
    // 强制 typeof 表达式与有效的字符串进行比较，防止类型拼写错误，如'string'拼写成'strnig'
    'valid-typeof': 2,
    // 需要把立即执行的函数包裹起来
    'wrap-iife': [2, 'any'],
    // 不允许条件判断时，变量在后
    yoda: [2, 'never'],
    // 在解构中，任何变量都应该是const
    'prefer-const': 2,
    // 线上禁用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 对象的'{'后和'}'前没有空格
    'object-curly-spacing': [2, 'never'],
    // 数组的'['后和']'前不出现空格
    'array-bracket-spacing': [2, 'never'],
    // 最大块嵌套深度为 5 层
    'max-depth': [2, 5],
    // 限制单行代码的长度
    // @off 不限制
    'max-len': 0,
    // 限制单个文件最大行数
    // @off 不限制
    'max-lines': 0,
    // 最大回调深度为 3 层
    'max-nested-callbacks': [2, 3],
    // 指定一个函数中所允许允许的最大语句数量
    'max-statements': ['error', 100]
  }
};
