namespace HuongVietSinh.Web.Models;

public class NewsArticle
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string CoverImage { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Author { get; set; } = "Ban Truyền Thông";
    public DateTime PublishedAt { get; set; } = DateTime.Now;
    public bool IsFeatured { get; set; }
    public bool IsHighlight { get; set; }
}
