const fs = require("fs").promises;
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.format({
  root: "./",
  dir: "db",
  base: "contacts.json",
});

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsResult = JSON.parse(contacts);

    return contactsResult;
  } catch (error) {
    return console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactsId = contacts.filter(({ id }) => id === contactId);

    return contactsId;
  } catch (error) {
    return console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removeContact = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(removeContact));

    return removeContact;
  } catch (error) {
    return console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    let contacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };

    contacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return contacts;
  } catch (error) {
    return console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
