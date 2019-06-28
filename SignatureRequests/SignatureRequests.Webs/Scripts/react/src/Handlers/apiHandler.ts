function redirectToLoginPage() {
  window.location.href = "/";
}

function checkApiForErrors(response: Response) {
  if (response.status === 401) {
    redirectToLoginPage();
  }

  // verify the status code is 200
  if (!response.ok) {
    throw Error(response as any);
  }

  // verify the response is in json
  const contentType = response.headers.get("content-type");
  

  return response.json();
}

interface APIHandlerProps<T> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers: { "Content-Type": "application/json"};
  /* A class representing  */
  responseType: { new (apiResponse: any): T };

  /* The data you want to send to the API, example: { status: 5, input: "text value" } */
  data?: any;
}

/**
 *
 * @param url
 * @param props
 * @example await APIHandler(`/api/someEntity/${id}`, { method: "POST", data: newItem, responseType: ClassForResponseType });
 */
export async function APIHandler<T>(
  url: string,
  props: APIHandlerProps<T>
): Promise<T> {
  let urlQS = "";
  const requestOptions: RequestInit = {
    method: props.method,
    credentials: "same-origin",
    headers: props.headers,
    
  };
  let data = props.data || {};

  switch (props.method) {
    case "GET":
      // add data to querystring (if we drop ie11 support or add more polyfills this can be cleaned up)
      const qsParams = Object.keys(data)
        .filter((k: string) => data[k] !== undefined)
        .map(
          (k: string) =>
            `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`
        )
        .join("&");

      if (qsParams.length !== 0) {
        urlQS += "?" + qsParams;
      }
      break;

    case "PUT":
    case "POST":
    //falls through to DELETE, which is adding to 'database'
    //does it auto increment id or do i need to implement id?
    //gives random ass ids
    case "DELETE":
      // add data to the request body
      //formatting for controller to use
      if (props.data) {
        requestOptions.body = JSON.stringify(props.data);
      }

      break;

    default:
      throw `APIHandler does not support the method type "${props.method}"`;
  }

  // credentials: include is needed for edge
  return fetch(url + urlQS, requestOptions)
    .then(checkApiForErrors)
    .then(apiResponse => {
      return new props.responseType(apiResponse);
    });
}
