public sealed class PaginatedResponse<T>
{
    public IReadOnlyList<T> Items { get; init; } = [];
    public bool HasMore { get; init; }
}