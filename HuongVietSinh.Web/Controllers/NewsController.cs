using Microsoft.AspNetCore.Mvc;
namespace HuongVietSinh.Web.Controllers
{
    public class NewsController : Controller
    {
        public IActionResult Index() => View();
        public IActionResult Detail() => View();
    }
}
