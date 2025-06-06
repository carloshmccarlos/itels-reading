import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateArticlePage from '@/app/article/create/page';
import { useRouter } from 'next/navigation';

// 模拟 next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// 模拟 fetch API
global.fetch = jest.fn();

describe('CreateArticlePage', () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ id: '123' }),
    });
  });

  it('应该渲染创建文章表单', () => {
    render(<CreateArticlePage />);
    
    expect(screen.getByText('创建新文章')).toBeInTheDocument();
    expect(screen.getByLabelText('标题')).toBeInTheDocument();
    expect(screen.getByLabelText('图片URL')).toBeInTheDocument();
    expect(screen.getByLabelText('描述')).toBeInTheDocument();
    expect(screen.getByLabelText('分类')).toBeInTheDocument();
    expect(screen.getByLabelText('内容')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '创建文章' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '取消' })).toBeInTheDocument();
  });

  it('应该更新表单数据', async () => {
    render(<CreateArticlePage />);
    
    const titleInput = screen.getByLabelText('标题');
    const imageUrlInput = screen.getByLabelText('图片URL');
    const descriptionInput = screen.getByLabelText('描述');
    const categorySelect = screen.getByLabelText('分类');
    const contentInput = screen.getByLabelText('内容');
    
    await userEvent.type(titleInput, '测试标题');
    await userEvent.type(imageUrlInput, 'https://example.com/image.jpg');
    await userEvent.type(descriptionInput, '测试描述');
    await userEvent.selectOptions(categorySelect, 'nature-geography');
    await userEvent.type(contentInput, '测试内容');
    
    expect(titleInput).toHaveValue('测试标题');
    expect(imageUrlInput).toHaveValue('https://example.com/image.jpg');
    expect(descriptionInput).toHaveValue('测试描述');
    expect(categorySelect).toHaveValue('nature-geography');
    expect(contentInput).toHaveValue('测试内容');
  });

  it('应该提交表单并重定向', async () => {
    render(<CreateArticlePage />);
    
    // 填写表单
    await userEvent.type(screen.getByLabelText('标题'), '测试标题');
    await userEvent.type(screen.getByLabelText('图片URL'), 'https://example.com/image.jpg');
    await userEvent.type(screen.getByLabelText('描述'), '测试描述');
    await userEvent.selectOptions(screen.getByLabelText('分类'), 'nature-geography');
    await userEvent.type(screen.getByLabelText('内容'), '测试内容');
    
    // 提交表单
    await userEvent.click(screen.getByRole('button', { name: '创建文章' }));
    
    // 验证 fetch 调用
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/articles/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.any(String),
      });
    });
    
    // 验证重定向
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/article/123');
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  it('应该处理提交错误', async () => {
    // 模拟 fetch 失败
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });
    
    // 模拟 console.error 和 alert
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    window.alert = jest.fn();
    
    render(<CreateArticlePage />);
    
    // 填写表单
    await userEvent.type(screen.getByLabelText('标题'), '测试标题');
    await userEvent.type(screen.getByLabelText('图片URL'), 'https://example.com/image.jpg');
    await userEvent.type(screen.getByLabelText('描述'), '测试描述');
    await userEvent.selectOptions(screen.getByLabelText('分类'), 'nature-geography');
    await userEvent.type(screen.getByLabelText('内容'), '测试内容');
    
    // 提交表单
    await userEvent.click(screen.getByRole('button', { name: '创建文章' }));
    
    // 验证错误处理
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('提交文章失败，请重试');
    });
    
    consoleErrorSpy.mockRestore();
  });

  it('应该在点击取消按钮时返回上一页', async () => {
    render(<CreateArticlePage />);
    
    await userEvent.click(screen.getByRole('button', { name: '取消' }));
    
    expect(mockRouter.back).toHaveBeenCalled();
  });
}); 