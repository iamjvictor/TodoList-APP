import React, { useEffect, useState } from 'react'
import { Text, View,  Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { FIRESTORE_DB } from '../config/firebaseconfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AntDesign } from '@expo/vector-icons';


export interface Task {
  title: string;
  done: boolean;
  id: string;
};


const List = ({ navigation}: any) =>{

const [tasks, setTasks] = useState<Task[]>([]);
const [task, setTask] = useState('');
const [check, setCheck] = useState('');

useEffect (() => {
  const taskRef = collection(FIRESTORE_DB, 'Task');

  let subscriber = onSnapshot(taskRef, {
    next: (snapshot) => {
      const tasks: Task[] = [];
      snapshot.docs.forEach((doc) => {
        
        tasks.push({
          id: doc.id,
          ...doc.data()
        } as Task)

      });

      setTasks(tasks)
    },

  });

  return () => subscriber();
}, []);

const addTodo = async () => {
<<<<<<< HEAD
const doc = await addDoc(collection(FIRESTORE_DB, 'Task'), {title: task, done: false})
setTask("");
=======
 
  let today = new Date();
  let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();     
  const doc = await addDoc(collection(FIRESTORE_DB, 'Task'), {title: task, done: false, createDate: date, checkDate: check,})
  setTask('');
>>>>>>> detailsConteiner
};


const renderTask = ({item}: any) =>{

  const ref = doc(FIRESTORE_DB, `Task/${item.id}`);

  const doneTask = async () => {
    let today = new Date();
    let date = today.getDate()+'-'+ (today.getMonth() + 1 )+'-'+ today.getFullYear() + '     ' + (today.getHours() - 3) + ':'+ today.getMinutes() ;     
    updateDoc(ref, { done: !item.done, checkDate: date});
    
  }

  const deleteTask =async () => {
    deleteDoc(ref);
  }



/* Render Task Container  */
  return(

    <View style={styles.taskContainer}>
      <TouchableOpacity style={styles.task} onPress={doneTask}>
        {item.done && <AntDesign name="checksquare" size={24} color="green" />}
        {!item.done && <AntDesign name="closesquareo" size={24} color="black" />}
        <Text style={styles.taskTitle}>{item.title}</Text>
      </TouchableOpacity>
      <Ionicons onPress={deleteTask} name="trash-bin" size={24} color="black" />
    </View>
  )
}



/*Render the Form an call function renderTask */

return(
      <View style={styles.container}>
        <View style={styles.form}>
            <TextInput style={styles.input} placeholder='Add a new Task' onChangeText={(text: string) => setTask(text)} value={task}/>
            <Button onPress={() => addTodo()} title='ADD' disabled={task === ''} />
        </View>

        {tasks.length > 0 && (
            <View>
             <FlatList
             data={tasks}
             renderItem={renderTask}
             keyExtractor={
              (task: Task) => task.id
             }
             />
           </View>
   
        )}
       

<<<<<<< HEAD


      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}  >
        <Text style={styles.buttonText}>Details</Text>
      </TouchableOpacity>
      
        
=======
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}>
          <Text style={styles.buttonText}>Details</Text>
      </TouchableOpacity>
      </View>
>>>>>>> detailsConteiner
      </View>
  )
}


export default List;



const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20, 
    
  },

  form: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:20,
  },

  input:{
    flex:1,
    borderRadius:3,
    borderWidth:1,
    height: 40,
    marginRight:10,
    padding:10,
    
  },
  

  
  button:{
    borderRadius:10,
    backgroundColor:"#B0C4DE",
    elevation:8,
    padding: 10,
    marginRight:"auto",
    justifyContent:"center",
    marginLeft:"auto",
    marginTop:30,

    
  },

  buttonText:{
    fontWeight:"bold",
    fontSize:16,
    textTransform:"uppercase"
  },

  taskContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:5,
    backgroundColor:"#B0C4DE",
    padding:10,
    
  
  }, 

  taskTitle:{
    paddingHorizontal:5,
    fontWeight: "bold",
    color:"black",
    textTransform:"uppercase"
  },

  task:{
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
  },

  buttonContainer:{
    
    flex: 1,
    marginTop:15,
    alignItems: 'center',
    
  },

  buttonText:{
   
      fontSize: 20,
      textAlign: 'center',
      fontWeight:"bold",
  }


});


