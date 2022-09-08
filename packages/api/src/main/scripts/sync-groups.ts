import { PrismaClient } from '@prisma/client'
import { getFirestore } from 'firebase-admin/firestore'

const db = getFirestore()

const syncGroupsWithFirestore = async () => {
  const client = new PrismaClient()

  const disciplineGroups = await client.disciplineGroup.findMany()

  for (const group of disciplineGroups) {
    const groupRef = db.collection('disciplineGroups').doc(group.code)

    await groupRef.set(group)
  }

  const disciplines = await client.discipline.findMany()

  for (const discipline of disciplines) {
    const disciplineRef = db.collection('disciplines').doc(discipline.code)

    await disciplineRef.set(discipline)
  }

  const students = await client.student.findMany({ include: { user: true } })

  for (const student of students) {
    const studentRef = db.collection('students').doc(student.user!.email!)

    await studentRef.set(student)
  }

  const teachers = await client.teacher.findMany({ include: { user: true } })

  for (const teacher of teachers) {
    const teacherRef = db.collection('teachers').doc(teacher.user!.email!)

    await teacherRef.set(teacher)
  }

  const users = await client.user.findMany()

  for (const user of users) {
    const userRef = db.collection('users').doc(user.email)

    await userRef.set(user)
  }

  console.log('SYNC FINISHED')
}

syncGroupsWithFirestore()
