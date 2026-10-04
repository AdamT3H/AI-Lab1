# Вартість викликів — Лабораторна 1

Ollama: `ollama --version` → <вивід> · дата вимірів: 2026-10-04

## 1. Звірка оцінки вхідних токенів (хмарна модель, критерій ≤ 10%)

| прогін | провайдер | модель | вхідні | кешовані | вихідні | оцінка входу до виклику | похибка % | $ фактично | $ за прайсом models.ts | затримка, мс | дата |
|---|---|---|---|---|---|---|---|---|---|---|---|
| gemini-1 | google | gemini-3.8-flash | 14208 | 0 | 790 | 14208 | 0.0 | 0.000000 | 0.013619 | 3406 | 2026-10-04 |
| gemini-2 | google | gemini-3.8-flash | 14208 | 8170 | 919 | 14208 | 0.0 | 0.000000 | 0.014102 | 8876 | 2026-10-04 |

Команда: npx tsx --env-file=.env.local scripts/measure-cost.ts gemini
Чим оцінено до виклику: Gemini countTokens (REST, generateContentRequest) · факт: usageMetadata.promptTokenCount

Вердикт: обидва прогони в межах 10% (похибка 0.0%).
Вихідні токени включають роздуми: gemini-1 — 78 + 712, gemini-2 — 106 + 813 (thoughtsTokenCount тарифікується як вихід).

## 2. Кешування

Префікс: scripts/doctor.ts + scripts/sync-skills.ts + src/models.ts (для Ollama — перші 6000 символів).

| прогін | провайдер | модель | вхідні | кешовані | вихідні | оцінка входу до виклику | похибка % | $ фактично | $ за прайсом models.ts | затримка, мс | дата |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ollama-1 | ollama | qwen3:4b | 2012 | 0 | 64 | — | — | 0.000000 | 0.000000 | 19872 | 2026-10-04 |
| ollama-2 | ollama | qwen3:4b | 2012 | 2011 | 64 | — | — | 0.000000 | 0.000000 | 2500 | 2026-10-04 |

Назва поля кешу: cache_read_input_tokens (/v1/messages) · сирий usage другого виклику: `{"input_tokens":1,"cache_read_input_tokens":2011,"output_tokens":64}`
Для Ollama: це повторне використання префікса моделі, а не знижка в рахунку.
Затримка першого виклику включає, ймовірно, завантаження моделі в пам'ять, тож різницю 19872 → 2500 мс не можна приписувати лише кешу.
Gemini: на другому виклику теж прочитано з кешу 8170 з 14208 токенів (сирий usageMetadata: `cachedContentTokenCount: 8170`); кеш неявний і негарантований, покриття часткове.

## 3. Множник «українська / англійська»

| Провайдер | Модель | Текст (про що, скільки слів) | Токени en | Токени ua | ua / en |
|---|---|---|---|---|---|
| google | gemini-3.8-flash | журнал дій агента, 3 абзаци | 234 | 304 | 1.30 |
| ollama | qwen3:4b | журнал дій агента, 3 абзаци | 229 | 439 | 1.92 |

Команда: npx tsx --env-file=.env.local scripts/measure-cost.ts lang docs/lab1/cost.md
Тексти, на яких виміряно множник (скрипт читає саме ці два блоки):

```ua
Журнал дій агента — це файл, у який hook дописує по одному рядку на кожен виклик інструмента. Без нього «агент зробив» і «агент сказав, що зробив» звучать однаково, а перевірити різницю неможливо. Кожен рядок містить час, назву інструмента, шлях або команду, результат, ідентифікатор сесії та назву джерела. Вміст файлів у журнал не потрапляє, бо репозиторій публічний, і будь-який секрет, що туди потрапив, вважається скомпрометованим.

Окремий файл для кожного інструмента зменшує кількість конфліктів між гілками й дозволяє порівнювати дві сесії поруч. Результат «ok» чесний лише тоді, коли подія спрацьовує після успішного виклику, тому невдалі виклики ловить окрема подія. Заблоковані дії не потрапляють у журнал самі: рядок «denied» пише hook заборони, який виконується до виклику.

На захисті викладач відкриває довільний рядок журналу, і пояснити його має людина. Тому журнал не можна редагувати заднім числом: незручний запис коштує менше, ніж підчищений.
```

```en
An agent action log is a file where a hook appends one line for every tool call. Without it, "the agent did it" and "the agent said it did it" sound the same, and there is no way to check the difference. Each line holds a timestamp, the tool name, a path or command, the result, a session identifier and the name of the source. File contents never go into the log, because the repository is public, and any secret that lands there is treated as compromised.

A separate file for each tool reduces the number of conflicts between branches and lets you compare two sessions side by side. The result "ok" is honest only when the event fires after a successful call, so failed calls are caught by a separate event. Blocked actions do not reach the log on their own: the "denied" line is written by the deny hook, which runs before the call.

At the defense, the instructor opens a random line of the log, and a human has to explain it. That is why the log must never be edited after the fact: an inconvenient entry costs less than a scrubbed one.
```

## 4. Три прогони (крок 11)