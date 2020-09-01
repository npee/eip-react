import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import QuizListComponent from "../quiz/QuizListComponent";
import AddQuizComponent from "../quiz/AddQuizComponent";
import EditQuizComponent from "../quiz/EditQuizComponent";
import HomeContainer from "../main/home/HomeComponent";
import CommonLayoutComponent from "../main/home/CommonLayoutComponent";

const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <div style={style}>
                    <Switch>
                        <Route exact path="/" component={HomeContainer} />
                        <Route path="/quizzes" component={QuizListComponent} />
                        <Route path="/add-quiz" component={AddQuizComponent}/>
                        <Route path="/edit-quiz" component={EditQuizComponent}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

const style = {
    margin: '10px'
}

export default AppRouter;
