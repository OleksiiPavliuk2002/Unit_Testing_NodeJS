const obj = {
    myFunction: function(a, b) {
        return a + b;
    }
}

test('mocking a function', () => {
    const mockFunction = jest.spyOn(obj, 'myFunction');
    mockFunction.mockResolvedValue(10);
    expect(mockFunction(2, 3)).toBe(10);
});