import handleSubmit from '../handleSubmit';

describe('handleSubmit', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('debe retornar un error', async () => {
    fetch.mockReject({ status: 500 });
    const result = await handleSubmit('test@localhost', 'xxxx');
    expect(result.status).toEqual(500);
    expect(fetch.mock.calls.length).toEqual(1);
  });

  it('debe retornar status 200', async () => {
    fetch.mockResponse({ status: 200 });
    const result = await handleSubmit('user@localhost', '123456');
    expect(result.status).toEqual(200);
    expect(fetch.mock.calls.length).toEqual(1);
  });
});
