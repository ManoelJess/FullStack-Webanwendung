export default function addResponse(
  err: any,
  res: any,
  resp: any,
  errorMessage: string
): string | Array<Object> {
  if (!err) {
    res.status(200).json(resp.rows);

    return resp.rows;
  }

  res.status(404).json({ ErrorMessage: errorMessage });

  return errorMessage;
}
