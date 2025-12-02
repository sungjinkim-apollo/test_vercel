export default function handler(request, response) {
  const { name } = request.query;
  response.status(200).json({
    message: `안녕하세요, ${name || '방문자'}님!`,
    time: new Date().toLocaleString()
  });
}
