export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("emails").del();

  await knex("emails").insert([
    {
      id: 1,
      to: "user@example.com",
      subject: "Did you see this?",
      body: "Hey,\n\nI was thinking about what we talked about earlier. Let me know what you think when you have a minute.\n\nCheers",
    },
    {
      id: 2,
      to: "user@example.com",
      subject: "Quick reminder",
      body: "Hi,\n\nJust a quick reminder about the thing we discussed yesterday. No rush, just didn’t want it to slip.\n\nThanks!",
    },
    {
      id: 3,
      to: "user@example.com",
      subject: "Random thought",
      body: "This might sound random, but I had an idea and wanted to share it with you before I forget.\n\nTalk soon.",
    },
    {
      id: 4,
      to: "user@example.com",
      subject: "Following up",
      body: "Hey there,\n\nI’m following up on my last message. Let me know if now’s a good time or if we should reconnect later.",
    },
    {
      id: 5,
      to: "user@example.com",
      subject: "All good?",
      body: "Hi,\n\nJust wanted to check in and see if everything’s alright on your end.\n\nBest,\nNoah",
    },
  ]);
}
