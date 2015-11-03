#Plan & Basic Rqmts Checklist:

##Big Questions:
- How do I store user and password information securely?
- What additional steps will the user need to take when interacting with the application? More specifically, what additional routes will the application need to handle? <see views -->.ejs files</i>
- What strategies do I need to employ to secure existing site functionality? <i>Make sure username/password rqmt comes up immediately upon visiting site.</i>
- How often should the user need to enter their username + password? <i> perhaps every 5 minutes, or session ends? MVP) </i>


<ul class="ng-scope">
<li>Build a simple session-based server-side authentication system - from scratch:<ul>
<li><input class="readme-checkbox" name="task-1" type="checkbox">Make sure that you pass the tests marked as pending (<code>xdescribe</code>) in the spec file.<ul>
<li><input class="readme-checkbox" name="task-2" type="checkbox">Add tests for your authentication if necessary.</li>
<li>Use the tests to guide you through the other requirements.</li>
</ul>
</li>
<li><input class="readme-checkbox" name="task-3" type="checkbox">Create a new table <code>users</code> with columns <code>username</code> and <code>password</code>. Consider how you will store this information securely. What models will you need and what behavior will they encapsulate?</li>
<li><input class="readme-checkbox" name="task-4" type="checkbox">Allow users to register for a new account, or to login - build pages for login and sign up, and add routes to process the form data using POST actions.</li>
<li><input class="readme-checkbox" name="task-5" type="checkbox">Add a <code>checkUser</code> helper to all server routes that require login, redirect the user to a login page as needed. Require users to log in to see shortened links and create new ones. Do NOT require the user to login when using a previously shortened link.</li>
<li><input class="readme-checkbox" name="task-6" type="checkbox">Enable sessions so that the user does not need to keep logging in when reloading the page.</li>
<li><input class="readme-checkbox" name="task-7" type="checkbox">Don't forget to give the user a way to log out!</li>
</ul>
</li>
</ul>