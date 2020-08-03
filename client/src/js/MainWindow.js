import React, { useState } from 'react';
import PropTypes from 'prop-types';

function MainWindow({ startCall, clientId }) {
  const [friendID, setFriendID] = useState(null);
  const [connectState, setConnectState] = useState('profile')
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  const callWithVideo = (video) => {
    const config = { audio: true, video };
    return () => friendID && startCall(true, friendID, config);
  };

  const copyIdToClipboard = (target, id) =>{
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = id;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  //alert(friendID)
  return (
    <div className="main-window">
      <div className="row-toggler">
      {
        connectState === 'profile' ? (
          <div className="proper-row">
              <div className="block-1 active-box" onClick={e => setConnectState('profile')}>
                 Profile
              </div>
              <div className='block-2' onClick={e => setConnectState('connect')}>
                 Connect
              </div>
          </div>          
        ):(
        <div className="proper-row">
              <div className="block-1" onClick={e => setConnectState('profile')}>
                Profile
              </div>
              <div className='block-2 active-box' onClick={e => setConnectState('connect')}>
                Connect
              </div>
        </div> 
        )
      }
      </div>

      <div className="row-toggler">
        {

            connectState === 'profile' ? (
              <div className="proper-row mt-10">
                  <div className="block-1">
                    Your Unique ID :
                  </div>
                  <div 
                      className="block-2"
                      onClick={e => copyIdToClipboard(e.target, clientId)}
                    >
                    {clientId}
                  </div>
              </div>
            ):(
              <>
                  <div className="proper-row mt-10">
                    <div className="block-1">
                      Paste Your Friends Id : 
                    </div>
                    <div className="block-2">
                      <input
                        type="text"
                        className="input-id"
                        spellCheck={false}
                        placeholder="Your friend ID"
                        onChange={(event) => setFriendID(event.target.value)}
                      />
                      <div>
                        <button
                          type="button"
                          className="btn-action fa fa-video-camera"
                          onClick={callWithVideo(true)}
                        />
                        <button
                          type="button"
                          className="btn-action fa fa-phone"
                          onClick={callWithVideo(false)}
                        />
                      </div>

                    </div>
                    
                  </div>

              </>
            )
        }

      </div>
    </div>




    // <div className="container main-window">
    //   <div>
    //     <h3>
    //       Hi, your ID is
    //       <input
    //         type="text"
    //         className="txt-clientId"
    //         defaultValue={clientId}
    //         readOnly
    //       />
    //     </h3>
    //     <h4>Get started by calling a friend below</h4>
    //   </div>
    //   <div>
    //     <input
    //       type="text"
    //       className="txt-clientId"
    //       spellCheck={false}
    //       placeholder="Your friend ID"
    //       onChange={(event) => setFriendID(event.target.value)}
    //     />

    //   </div>
    // </div>
  );
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired
};

export default MainWindow;
