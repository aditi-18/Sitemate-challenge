// client.js
const axios = require('axios');
const readline = require('readline');

const apiUrl = 'http://localhost:3000/api/issues';

// interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// prompt the user for input
function prompt(message) {
  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      resolve(answer);
    });
  });
}

//  function to run the interactive client
async function run() {
  while (true) {
    console.log('\nOptions:');
    console.log('1. Create an issue');
    console.log('2. Read all issues');
    console.log('3. Update an issue');
    console.log('4. Delete an issue');
    console.log('5. Exit');

    const choice = await prompt('Select an option (1-5): ');

    switch (choice) {
      case '1':
        const title = await prompt('Enter issue title: ');
        const description = await prompt('Enter issue description: ');
        await createIssue({ title, description });
        break;

      case '2':
        await readIssues();
        break;

      case '3':
        const updateId = await prompt('Enter issue ID to update: ');
        const updatedTitle = await prompt('Enter updated title: ');
        const updatedDescription = await prompt('Enter updated description: ');
        await updateIssue(updateId, { title: updatedTitle, description: updatedDescription });
        break;

      case '4':
        const deleteId = await prompt('Enter issue ID to delete: ');
        await deleteIssue(deleteId);
        break;

      case '5':
        rl.close();
        process.exit(0);

      default:
        console.log('Invalid option. Please enter a number between 1 and 5.');
        break;
    }
  }
}

async function createIssue(issue) {
  const response = await axios.post(apiUrl, issue);
  console.log('Create Response:', response.data);
}

async function readIssues() {
  const response = await axios.get(apiUrl);
  console.log('Read Response:', response.data);
}

async function updateIssue(id, updatedIssue) {
  const response = await axios.put(`${apiUrl}/${id}`, updatedIssue);
  console.log('Update Response:', response.data);
}

async function deleteIssue(id) {
  const response = await axios.delete(`${apiUrl}/${id}`);
  console.log('Delete Response:', response.data);
}

// Run  client
run().catch((error) => {
  console.error('An error occurred:', error);
}).finally(() => {
  rl.close();
});
