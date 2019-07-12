import './scss/style.scss';
import HelloModule from './HelloModule/HelloModule';

(function(){
    $( window ).on( 'load', () => {
        HelloModule.sayHello();

        setTimeout( () => {
            HelloModule.sayGoodbye();
        }, 1000 );
    });
})();
