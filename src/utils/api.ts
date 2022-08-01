import { Todo } from '@/types/todo'
import { collection, doc, getDoc, getFirestore, setDoc, Timestamp } from 'firebase/firestore'
import useStorage from '@/hooks/useStorage'
import delay from '@/utils/delay'

const localStorage = useStorage().localStorage

async function fetchDataOnFirestore (userId: string): Promise<Todo[]> {
  //alert('here');
  const db = getFirestore()
  console.log(db);
  const docRef = doc(collection(db, 'todos'), userId)
  console.log(docRef);
  const snapshot = await getDoc(docRef)
  let data = snapshot.data();
  console.log();
  fetch('https://jsonplaceholder.typicode.com/users/1/todos')
    .then((response) => response.json())
    .then((json) => {
      for(let i = 0; i < json.length; i ++) {
        data.items.push({
          done: false,
          id: json[i].id,
          level: 0,
          text: json[i].title,
          createdAt: data.items[0].createdAt,
        });
      }
    })
    await delay(250)

    console.log(data.items);
    saveDataOnLocalStorage(
      (data?.items ?? []).map((x: { createdAt: Timestamp }) => ({
        ...x,
        createdAt: x.createdAt.toDate()
      }))
    );
    return (data?.items ?? []).map((x: { createdAt: Timestamp }) => ({
      ...x,
      createdAt: x.createdAt.toDate()
    })) as Todo[]
}

async function saveDataOnFirestore (todoList: Todo[], userId: string): Promise<void> {
  const db = getFirestore()
  const docRef = doc(collection(db, 'todos'), userId)
  await setDoc(docRef, { items: todoList })
}

async function fetchDataOnLocalStorage () {
  await delay(250)
  return localStorage.getItem<Todo[]>('todo') ?? []
}

async function saveDataOnLocalStorage (todoList: Todo[]) {
  await delay(250)
  localStorage.setItem('todo', todoList)
}

export function fetchData (userId?: string): Promise<Todo[]> {
  let fetchFunction: Promise<Todo[]>

  if (userId) {
    fetchFunction = fetchDataOnFirestore(userId)
  } else {
    fetchFunction = fetchDataOnLocalStorage()
  }

  return fetchFunction
}

export function saveData (todoList: Todo[], userId?: string): Promise<void> {
  let saveFunction: Promise<void>

  if (userId) {
    saveFunction = saveDataOnLocalStorage(todoList)
  } else {
    saveFunction = saveDataOnLocalStorage(todoList)
  }

  return saveFunction
}
