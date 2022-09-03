import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "xkucsih3",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-03-25",
  token:
    "skT8rTqZUDaawVUL26TcB2Za1bj4zl4lMG7dt3ktdDOym6FgrgpFBZdqonR6Y4RoGvna4XQh3srXwmH1MIq4ld2ZLj4lMXIE5BpkpGqjCWpxNDClOwxhpqxQINKJprGxSjk3ugT00plwoMLLJ1FywZknVKFKbuDHQsLAgjxYojZH7QCiOq38",
});

export default client;
