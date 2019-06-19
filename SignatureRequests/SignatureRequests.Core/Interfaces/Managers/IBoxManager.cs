using SignatureRequests.Core.Entities;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Managers
{
    public interface IBoxManager
    {
        BoxResponseList GetBoxes();
        BoxResponse GetBox(int id);
        BoxResponse CreateBoxEntity(BoxRequest newBox);
        BoxResponse UpdateBox(int id, BoxRequest newBox);
        void Delete(int id);
        BoxResponseList GetAllInclude();
        BoxResponseList BoxToListResponse(IEnumerable<BoxEntity> me);
        BoxEntity BoxToDbItem(BoxRequest me, BoxEntity updating = null);
        BoxResponse BoxToListItem(BoxEntity me);
    }
}
