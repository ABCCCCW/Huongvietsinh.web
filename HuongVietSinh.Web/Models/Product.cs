namespace HuongVietSinh.Web.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string DetailDescription { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Tag { get; set; } = string.Empty;
    public string TagType { get; set; } = "ocop";
}
