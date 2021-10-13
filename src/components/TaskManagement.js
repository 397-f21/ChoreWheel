const AddTask = () => (
    <div className="container">
        <form>
            <div class="form-group">
                <label for="exampleFormControlInput1">Task</label>
                <input class="form-control" id="exampleFormControlInput1" placeholder="Clean living room" />
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Assign to:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>user 1</option>
                    <option>user 2</option>
                    <option>user 3</option>
                    <option>user 4</option>
                    <option>user 5</option>
                </select>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect2">Daily interval</label>
                <select multiple class="form-control" id="exampleFormControlSelect2">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary m-2">Add task</button>
            <button type="cancel" class="btn btn-secondary m-2">Cancel</button>
        </form>
    </div>
)

export default AddTask