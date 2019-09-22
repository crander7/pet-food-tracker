import React from 'react';
import { Link } from 'react-router-dom';
import Arrow from '@material-ui/icons/ChevronRight';

/**
 * 404 template
 * @returns {string} 404 template
 */
export default () => {
    const styles = {
        flexStyle: {
            display: 'flex',
            alignItems: 'center',
            color: 'black'
        },
        defStyle: {
            position: 'absolute',
            left: '5vw',
            top: '3vh'
        },
        videoStyle: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            zIndex: -100,
            transform: 'translate(-50%, -50%)'
        },
        imgStyle: {
            height: '25px',
            width: '25px'
        },
        titleStyle: {
            fontSize: '76px',
            color: 'black',
            fontWeight: 200,
            marginBottom: '2vw'
        },
        subTitleStyle: {
            marginBottom: '2vw'
        }
    };
    return (
        <div className="NotFound">
            <video
                className="hotdog"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    minWidth: '100%',
                    minHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    zIndex: -100,
                    transform: 'translate(-50%, -50%)'
                }}
                src="https://cdn.ueno.co/bf2836011ceb814ed1d78f8702487bc4.mp4"
                loop
                muted
                autoPlay
            >
                <track kind="captions" />
            </video>
            <div
                className="text-overlay"
                style={{
                    position: 'absolute',
                    left: '5vw',
                    top: '3vh'
                }}
            >
                <h1 style={styles.titleStyle}>404</h1>
                <h2 style={styles.subTitleStyle}>Not Found</h2>
                <p style={{ width: '400px' }}>
                    Congratulations you found our 404 page!
                </p>
                <div>
                    <Link to="/" href="/" style={styles.flexStyle}>
                        <Arrow />
                        <span><strong>Go Back</strong></span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
