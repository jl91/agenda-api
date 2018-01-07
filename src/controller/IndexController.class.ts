export class IndexController {


    public indexAction(request, response): void {

        response.json({
            'message': 'Hello World! 1'
        });
    }

}