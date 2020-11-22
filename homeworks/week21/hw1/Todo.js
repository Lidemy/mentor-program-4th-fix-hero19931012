/* eslint-disable import/no-unresolved */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';
import Color from './Constants';

export const hover = `
  &:hover{
    cursor: pointer;
  }
`;

const focus = `
  &:focus {
    outline: none;
  }
`;
const Title = styled.h1`
  text-align: center;
  color: ${Color.textHighlight};
`;

const Todos = styled.div``;

const TodoWrapper = styled.div`
  margin: 10px auto;
  width: 400px;
`;

const TodoInputForm = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 16px;
`;

const TodoInput = styled.input`
  margin-right: 10px;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px ${Color.muted} solid;
  font-size: 18px;
  color: ${Color.textPrimary};
  &::placeholder {
    color: ${Color.textMuted}
  }
  ${hover}
  ${focus}
`;

const TodoInputButton = styled.button`
  min-width: 38px;
  border-radius: 5px;
  padding: 5px;
  font-size: 13px;
  color: ${Color.textWhite};
  background: ${Color.primary};
  border: none;
  ${hover}
  ${focus}
`;

const TodoItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;

const TodoContent = styled.div`
  color: ${props => props.isDone === true ? Color.textMuted : Color.textPrimary};
  text-decoration: ${props => props.isDone === true ? 'line-through' : 'none'};
`;

const TodoButtonWrapper = styled.div``;

const DoneButton = styled.button`
  display: inline-block;
  margin-left: 10px; 
  padding: 5px;
  border: ${props => props.className === 'done' ? Color.muted : Color.primary} solid 1px;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${props => props.className === 'done' ? Color.muted : Color.primary};
  transition: all;
  background: none;
  
  ${hover}
  &:hover {
    color: ${Color.textWhite};
    background-color: ${props => props.className === 'done' ? Color.muted : Color.primary};;
  }
  ${focus}
`;

const DeleteButton = styled(DoneButton)`
  border-color: ${Color.warning};
  color: ${Color.warning};
  
  &:hover {
    color: ${Color.textWhite};
    background-color: ${Color.warning};
  }
`;

const TodoActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  & button {
    margin-left: 10px;
  }
`;

const TodoDFilterAll = styled(DoneButton)``;
const TodoFilterDone = styled(DoneButton)``;
const TodoFilterUndone = styled(DoneButton)``;
const TodoDeleteAllButton = styled(DeleteButton)``;

function TodoItem({
  todo,
  handleToggleIsDone,
  handleDeleteTodo,
}) {
  const handleTogglerClick = () => {
    handleToggleIsDone(todo.id);
  };

  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  return (
    <TodoItemWrapper>
      <TodoContent isDone={todo.isDone}>{todo.content}</TodoContent>
      <TodoButtonWrapper>
        <DoneButton className={todo.isDone === true && 'done'} onClick={handleTogglerClick}>{todo.isDone === true ? '標示未完成' : '標示已完成'}</DoneButton>
        <DeleteButton onClick={handleDeleteClick}>刪除</DeleteButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}

export default function Todo({
  todos,
  inputValue,
  handleInputChange,
  handleAddTodo,
  handleToggleIsDone,
  handleDeleteTodo,
  handleListAll,
  handleListDone,
  handleListUndone,
  handleDeleteAll,
}) {
  return (
    <TodoWrapper>
      <Title>Todo List</Title>
      <TodoInputForm onSubmit={handleAddTodo}>
        <TodoInput onChange={handleInputChange} value={inputValue} placeholder="input something here..." />
        <TodoInputButton type="submit">新增</TodoInputButton>
      </TodoInputForm>
      <Todos>
        {
          todos.map(todo => (
            todo.display === true ? <TodoItem key={todo.id} todo={todo} handleToggleIsDone={handleToggleIsDone} handleDeleteTodo={handleDeleteTodo} /> : ''
          ))
        }
      </Todos>
      <TodoActionWrapper>
        <TodoDFilterAll onClick={handleListAll}>列出全部</TodoDFilterAll>
        <TodoFilterDone onClick={handleListDone}>列出已完成</TodoFilterDone>
        <TodoFilterUndone onClick={handleListUndone}>列出未完成</TodoFilterUndone>
        <TodoDeleteAllButton onClick={handleDeleteAll}>清空</TodoDeleteAllButton>
      </TodoActionWrapper>
    </TodoWrapper>
  );
}
