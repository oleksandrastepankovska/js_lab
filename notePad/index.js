const title = document.querySelector('#title');
const content = document.querySelector('#content');
const addBtn = document.querySelector('#addBtn');
const colorPicker = document.querySelector('#color_picker');
const rootDiv = document.querySelector('#root');
const pin = document.querySelector('.pinned');

const LS_KEY = 'notes';
const defaultNotes = JSON.parse(localStorage.getItem(LS_KEY));
let notes = defaultNotes || [];
let deleteBtns;

const onDeleteClick = (e) => {
	deleteNote(e.target.dataset.id);
};

const changeInput = (el, value) => {
	el.value = value;
};

const renderNotes = () => {
	rootDiv.innerHTML = `${notes
		.map(
			(note) =>
				`<div style="background-color: ${note.color};" class="rendered_note">
	<options class="renderedNoteOptions">
		<div class="renderedDate">${note.createDate}</div>
	</options>
	<div class="renderedTitle" readonly>${note.title}</div>
	<textarea class="renderedContent" readonly>${note.content}</textarea>
	<button class="delete_button" data-id="${note.id}">delete</button>
</div>
`
		)
		.join('')}`;
	deleteBtns = document.querySelectorAll('.delete_button');
	deleteBtns.forEach((btn) => btn.addEventListener('click', onDeleteClick));
	changeInput(title, '');
	changeInput(content, '');
	changeInput(colorPicker, '#ffffff');
};

renderNotes();

var dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

const addNote = () => {
	if (!title.value || !content.value) {
		alert('Type anything');
		return;
	}else{
		const note = {
			id: '' + Date.now(),
			title: title.value,
			content: content.value,
			createDate: new Date().toLocaleDateString('pl-PL', dateOptions),
			color: colorPicker.value,
		};

		notes.push(note);
		localStorage.setItem(LS_KEY, JSON.stringify(notes));
		renderNotes();}
	
};

const deleteNote = (id) => {
	notes = notes.filter((item) => item.id !== id);
	localStorage.setItem(LS_KEY, JSON.stringify(notes));
	renderNotes();
	deleteBtns.forEach((btn) => btn.addEventListener('click', onDeleteClick));
};


deleteBtns.forEach((btn) => btn.addEventListener('click', onDeleteClick));
addBtn.addEventListener('click', addNote);
