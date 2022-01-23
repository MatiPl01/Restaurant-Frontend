import { Directive, TemplateRef, ViewContainerRef } from "@angular/core"
import { OnInit, OnDestroy, Input } from "@angular/core"
import { Subject, Subscription } from "rxjs"
import { AuthService } from "../services/auth.service"
import { User } from "../shared/models/db/user.model"

@Directive({
    selector: '[ifRole]'
})
export class IfRoleDirective implements OnInit, OnDestroy {
    @Input() ifRole: string[] = []
    stop$: Subject<any> = new Subject()
    isVisible: boolean = false

    subscriptions: Subscription[] = []

    constructor(private viewContainerRef: ViewContainerRef,
                private templateRef: TemplateRef<any>,
                private authService: AuthService
    ) {}

    ngOnInit() {
        // Check if an user has any of the roles specified
        this.subscriptions.push(
            this.authService.user.subscribe((user: User) => {
                if (user) {
                    const userRoles = user.getRoles()

                    for (let role of this.ifRole) {
                        if (userRoles.indexOf(role) >= 0) {
                            // DIsplay a component if an user is accessed to see this component
                            this.viewContainerRef.createEmbeddedView(this.templateRef)
                            return
                        }
                    }
                }

                // Otherwise, remove checked component from the user view
                this.viewContainerRef.clear()
            })
        )
    }

    // Clear the subscription on destroy
    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
    }
}
