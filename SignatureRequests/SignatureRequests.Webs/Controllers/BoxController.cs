using MvcCodeRouting.Web.Http;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System.Web.Http;

namespace BoxRequests.Controllers
{
    public class BoxController : ApiController
    {
        #region GlobalVariables
        private readonly IBoxManager _boxManager;
        #endregion
        #region Constructor
        public BoxController(IBoxManager boxManager)
        {
            _boxManager = boxManager;
        }
        #endregion
        #region API Methods
        // GET api/<controller>
        [Route("api/Box/GetBoxes")]
        [HttpGet]
        public BoxResponseList GetBoxes()
        {
            var boxes = _boxManager.GetBoxes();
            return boxes;
        }
        [Route("api/Box/GetBoxesbyFormId/{id}")]
        [HttpGet]
        public BoxResponseList GetBoxesByFormId([FromRoute] int id)
        {
            var boxes = _boxManager.GetBoxesByFormId(id);
            return boxes;
        }

        [Route("api/Box/GetModelBoxesbyFormId/{id}")]
        [HttpGet]
        public ModelBoxResponseList GetModelBoxesByFormId([FromRoute] int id)
        {
            var boxes = _boxManager.GetModelBoxesByFormId(id);
            return boxes;
        }

        [Route("api/Box/GetCopyBoxes/{id}")]
        [HttpGet]
        public BoxResponseList GetCopyBoxes([FromRoute] int id)
        {
            var boxes = _boxManager.GetCopyBoxes(id);
            return boxes;
        }
        [Route("api/Box/GetBoxesbyRequestId/{id}")]
        [HttpGet]
        public ModelBoxResponseList GetBoxesByRequestId([FromRoute] int id)
        {
            var boxes = _boxManager.GetBoxesByRequestId(id);
            return boxes;
        }

        [Route("api/Box/AddBox")]
        [HttpPost]
        public BoxResponse AddBox([FromBody]BoxRequest me)
        {
            var result = _boxManager.CreateBoxEntity(me);
            return result;
        }
        [Route("api/Box/UpdateBox/{id}")]
        [HttpPost]
        //POST:api/Product/UpdateProduct
        public BoxResponse UpdateBox([FromRoute]int id, [FromBody]BoxRequest me)
        {
            var result = _boxManager.UpdateBox(id, me);
            return result;
        }

        [Route("api/Box/AddDataToBox")]
        [HttpPut]
        public NumberResponse AddDataToBox([FromBody]SignedBoxRequest me)
        {
            var result = _boxManager.AddDataToBox(me);
            return result;
        }

        //// DELETE api/<controller>/5
        [Route("api/Box/DeleteBox/{id}")]
        [HttpDelete]
        public void Delete([FromRoute]int id)
        {
            _boxManager.Delete(id);
        }
        #endregion
    }
}
