import prompt from 'prompt-async';
import pg from 'pg';

const { Client } = pg;
const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_0pgwJMCOrht1@ep-frosty-fire-a94nhe0n-pooler.gwc.azure.neon.tech/neondb?sslmode=require'
});


class Student {
    constructor(first_name, last_name, phone_number, email, mark) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.email = email;
        this.mark = mark;
    }

    getInfo() {
        return `${this.first_name} ${this.last_name} (${this.email}, ${this.phone_number}) - Mark: ${this.mark}`;
    }
}

async function getAllStudents() {
    const queryText = 'SELECT * FROM students';
    const { rows } = await client.query(queryText);
    return rows.map(row => new Student(
        row.first_name,
        row.last_name,
        row.phone_number,
        row.email,
        row.mark
    ));
}

async function main() {
    try {
        await client.connect();

        
        const students = await getAllStudents();
        console.log('Список студентів:');
        students.forEach(student => {
            console.log(student.getInfo());
        });


    } catch (error) {
        console.error('Помилка:', error.message);
    } finally {
        await client.end();
    }
}

main();