import config from "../config"

const base = config.base

const dataTypes = {
  TEXT: 'text',
  DATE: 'date',
  NUMBER: 'number',
  PASSWORD: 'password'
}

const customer = {
  id: "id",
  key: 'customer',
  title: 'Customer',
  url: base + "customer",
  fields: [
    { name: "userName", placeholder: "Username", type: dataTypes.TEXT, editable: false },
    { name: "password", placeholder: "Password", type: dataTypes.PASSWORD, editable: true },
    { name: "fname", placeholder: "First Name", type: dataTypes.TEXT, editable: true },
    { name: "lname", placeholder: "Last Name", type: dataTypes.TEXT, editable: true }
  ]
}

const admin = {
  id: "id",
  key: 'admin',
  title: 'Admin',
  url: base + "admin",
  fields: [
    { name: "userName", placeholder: "Username", type: dataTypes.TEXT, editable: false },
    { name: "password", placeholder: "Password", type: dataTypes.PASSWORD, editable: true },
    { name: "fname", placeholder: "First Name", type: dataTypes.TEXT, editable: true },
    { name: "lname", placeholder: "Last Name", type: dataTypes.TEXT, editable: true }
  ]
}

const employee = {
  id: "id",
  key: 'employee',
  title: 'Employee',
  url: base + "employee",
  fields: [
    { name: "userName", placeholder: "Username", type: dataTypes.TEXT, editable: false },
    { name: "password", placeholder: "Password", type: dataTypes.PASSWORD, editable: true },
    { name: "fname", placeholder: "First Name", type: dataTypes.TEXT, editable: true },
    { name: "lname", placeholder: "Last Name", type: dataTypes.TEXT, editable: true }
  ]
}

const skills = {
  id: "skillId",
  key: 'skills',
  title: 'Skills',
  url: base + "skills",
  fields: [
    { name: "skillsName", placeholder: "Skill Name", type: dataTypes.TEXT, editable: true },
    { name: "title", placeholder: "Title", type: dataTypes.TEXT, editable: true },
    { name: "imageSrc", placeholder: "Image Source", type: dataTypes.TEXT, editable: true },
    { name: "description", placeholder: "Description", type: dataTypes.TEXT, editable: true },
    { name: "length", placeholder: "Length", type: dataTypes.NUMBER, editable: true },
    { name: "cost", placeholder: "Cost", type: dataTypes.NUMBER, editable: true },
  ]
}

const booking = {
  id: "enrollmentId",
  key: 'booking',
  alt: 'enrollment',
  title: 'Booking',
  url: base + "enrollment",
  fields: [
    { name: "customer", placeholder: "Customer ID", type: dataTypes.NUMBER, editable: true },
    { name: "employeeSchedule", placeholder: "Employee Schedule ID", type: dataTypes.NUMBER, editable: true },
  ]
}

const schedule = {
  id: "scheduleId",
  key: 'schedule',
  title: 'Schedule',
  url: base + "schedule",
  fields: [
    { name: "employee", placeholder: "Employee ID", type: dataTypes.NUMBER, editable: true },
    { name: "skills", placeholder: "Skills ID", type: dataTypes.NUMBER, editable: true },
    { name: "capacity", placeholder: "Capacity", type: dataTypes.NUMBER, editable: true },
    { name: "price", placeholder: "Price", type: dataTypes.NUMBER, editable: true },
    { name: "availability", placeholder: "Availability", type: dataTypes.DATE, editable: true },
    { name: "startingHour", placeholder: "Starting Hour", type: dataTypes.NUMBER, editable: true },
    { name: "length", placeholder: "Length", type: dataTypes.NUMBER, editable: true },
  ]
}

const types = {
  CUSTOMER: customer.key,
  ADMIN: admin.key,
  EMPLOYEE: employee.key,
  SKILLS: skills.key,
  BOOKING: booking.key,
  SCHEDULE: schedule.key,
  ENROLLMENT: booking.alt
}

const structs = {
  customer: customer,
  admin: admin,
  employee: employee,
  skills: skills,
  booking: booking,
  enrollment: booking,
  schedule: schedule
}

export { types, structs }