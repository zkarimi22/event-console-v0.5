import React from "react"; 
import { connect } from 'react-redux';
import { viewAction } from "../actions/viewActions";
import { dataSet } from "../actions/dataActions";

import { Layout, Grid, GridColumn, Card, Textbox, Checkbox, Modal, Button} from '@q4/nimbus-ui'; 
import { EditorState, convertToRaw,  ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
 
import './../../App.css';
 
//will place this as a call from the DB in ComponentDidMount once integrating a backend
const html = '<div style="border-bottom: 3px solid #D8D8D8; margin-bottom: 20px; padding-bottom: 20px; width: 100%;"> <img align="left" src="https://wendys2019ir.q4web.com/files/design/logo.png" alt="Wendys Logo"> </div> <div style="font-size: 16px; font-family: Arial; color: #000;"> You are invited to the Wendy\'s 2020 Investor Day: <br> <br> <a style="text-decoration: none; color: #029cd4;" href="https://www.irwendys.com/news/news-details/2019/The-Wendys-Company-To-Host-Investor-Day-On-Friday-October-11/default.aspx">The Wendy\'s Company To Host Investor Day On Friday, October 11</a> <br> <br> <a style="text-decoration: none; color: #029cd4;" href="https://www.irwendys.com/news/default.aspx">Click here</a> for a complete listing of The Wendy\'s Company press releases. </div> <div style="border-bottom: 3px solid #D8D8D8; margin-bottom: 20px; padding-bottom: 20px; width: 40%;"></div> <div style="font-size: 14px; font-family: Arial; color: #000;"> To unsubscribe from this list, please visit the <a style="text-decoration: none; color: #029cd4;" href="https://www.irwendys.com/investor-resources/email-alerts/default.aspx">email alert section of the The Wendy\'s Company site</a>. </div>';

class View4 extends React.Component{
    constructor(props) {
        super(props);
         const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);

          this.state = {
            editorState,
          };
        }
      }

  
    
      onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        }); 
      };
    
 render(){ 
 
  var dataSet = (dataKey,dataValue) => {

    this.props.dataSet(dataKey,dataValue);

  }

  
  const { editorState } = this.state;

      return (
        <div className="view4-screen">
        <Layout 
          height="viewport" 
          theme="slate" 
          alignItems="flex-start" 
          justifyContent="flex-start"
          direction="column"
          > 
    
        <p className="title-text--center">Draft an email alert below and click Schedule/Publish once ready.</p>
        <Editor
          editorState={editorState}
          wrapperStyle={styles.editorWrapper}
          editorStyle={styles.editor}
          toolbarStyle={styles.toolBar}
          onEditorStateChange={this.onEditorStateChange}
        />

        <div className="view4-screen_actions">
            <div  >
                    <Button 
                    theme="light-grey"
                    label="I'd like some help"
                    size="default"
                    onClick={this.props.nextStep}
                    />

                    <Button 
                    theme="citrus"
                    label="Save Draft"
                    size="default"
                    onClick={this.props.nextStep}
                    />
            </div>

            <div >
            <Button 
                 
                label="Schedule/Publish"
                size="default"
                onClick={this.props.nextStep}
            />
            </div>

        </div>
        
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
        </Layout>
      </div>
       );
    }
  }
  

  var styles = {
    editorWrapper:{
        backgroundColor:'white', 
        height:'60%',  
        overflow:'scroll'
    }
  }

  const mapStateToProps = (state) => {
    return {
        view: state.viewReducer.view,
        data: state.dataReducer.data
        // item: state.item,
        // setup: state.setup,
        // category: state.category.chosenCategory

      };
};

const mapDispatchToProps = (dispatch) => {
    return {
        viewAction: (viewKey,viewValue) => {
          dispatch(viewAction(viewKey,viewValue));
        },
        dataSet: (dataKey,dataValue) => {
          dispatch(dataSet(dataKey,dataValue));
        },
        // setupData: (setupObj) => {
        //   dispatch(setupData(setupObj));
        // },
        // catChange: (catUpdate) => {
        //   dispatch(catChange(catUpdate));
        // }
      };
};
    
    export default connect(mapStateToProps,mapDispatchToProps)(View4);