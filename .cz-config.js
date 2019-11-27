"use strict";
module.exports = {
  types: [
    {
      value: "feat",
      name: "feat:     一个新功能"
    },
    {
      value: "fix",
      name: "fix:      一个 bug 修复"
    },
    {
      value: "refactor",
      name: "refactor: 既不是修复 bug 也不是添加新功能的代码变更"
    },
    {
      value: "docs",
      name: "docs:     只有文档发生变更"
    },
    {
      value: "test",
      name: "test:     添加或者修改测试脚本"
    },
    {
      value: "chore",
      name: "chore:   影响构建系统或外部依赖的更改（例如：gulp，npm，webpack）"
    },
    {
      value: "style",
      name: "style:    对代码逻辑无影响的变更 (空格, 格式化, 缺少分号等)"
    },
    {
      value: "revert",
      name: "revert:   撤销上一次的提交"
    }
  ],

  scopes: [],
  messages: {
    type: "选择你提交的变更类型:",
    customScope: "(非必填)变更所影响的范围:",
    subject: "(必填)变更的简短描述:\n",
    body: "(非必填)变更的详细描述:\n",
    breaking: "(非必填)非兼容性变更说明:\n",
    footer: "(非必填)变更所关联的Issue ID， 例如: #31, #34:\n",
    confirmCommit: "你确定要继续执行上面的提交吗？"
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};
