URL='https://ai-lab1-delta.vercel.app/api/agent'
for p in 'Котра зараз година?' 'Скільки хвилин лишилось до півночі?' 'Привітайся одним реченням'; do
  printf '{"prompt":"%s"}' "$p" | curl -s -X POST "$URL" -H 'Content-Type: application/json; charset=utf-8' --data-binary @-; echo
done    