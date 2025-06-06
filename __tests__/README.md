# 测试文档

本项目使用 Jest 和 React Testing Library 进行测试。

## 运行测试

可以使用以下命令运行测试：

```bash
# 运行所有测试
npm test

# 监视模式（在开发过程中很有用）
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage

# CI 环境中运行测试
npm run test:ci
```

## 测试文件结构

测试文件位于 `__tests__` 目录中，结构与应用程序代码结构相匹配。例如：

- `__tests__/app/article/create/page.test.tsx` 测试 `app/article/create/page.tsx`

## 编写测试

测试使用 React Testing Library 和 Jest。示例：

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from '@/path/to/component';

describe('MyComponent', () => {
  it('应该正确渲染', () => {
    render(<MyComponent />);
    expect(screen.getByText('期望的文本')).toBeInTheDocument();
  });

  it('应该处理用户交互', async () => {
    render(<MyComponent />);
    await userEvent.click(screen.getByRole('button', { name: '按钮名称' }));
    expect(screen.getByText('交互后的文本')).toBeInTheDocument();
  });
});
``` 